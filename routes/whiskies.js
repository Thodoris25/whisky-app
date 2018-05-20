var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getWhiskies', function(req, res, next) {
    var connection = req.db;
    connection.query('SELECT p.Prod_ID, p.Prod_Name, p.Prod_abv, a.Age_Value as Prod_Age FROM product p\
    INNER JOIN age a ON p.Prod_AgeID = a.Age_ID', function(err, rows, fields) {
        res.json(rows);
    });
});


router.post('/addWhisky', function(req,res){
    let connection = req.db;

    let name = req.body.name;
    let age = req.body.age;
    let abv = req.body.abv;

    getAgeValue(connection, age)
    .then(ageID => {
        return insertProduct(connection, name, ageID, abv);
    })
    .then(insertedId => {
        res.json({"retID" : insertedId});
    })
    .catch(function(err){
        console.log(err);
    });  
});


router.post('/deleteWhisky', function(req,res){
    let connection = req.db;

    let id = req.body.rowID;

    connection.query("DELETE FROM product WHERE Prod_ID = ?",[id],function(err, result){
        if (err) throw(err);

        if(result.affectedRows > 0){
            console.log('Deleted ' + result.affectedRows + ' rows');
        }
        res.json({});
    });
});


const getAgeValue = (connection, age)  => {
    return new Promise ((resolve, reject) => {
        connection.query("SELECT Age_ID FROM age WHERE Age_Value = ?",[age],function(err, rows, fields){
            if (err) reject(err);
            if(rows.length != 0){
                resolve(rows[0].Age_ID);
            }else{
                connection.query("INSERT INTO age (Age_Value) VALUES (?)",[age],function(errInner, rowsInner, fieldsInner) {
                    if (errInner) reject(errInner);
                        resolve(rowsInner.insertId);
                });
            }
        });
    });
};


const insertProduct = async (connection, name, ageID, abv) => {
    return new Promise ((resolve, reject) => {
        connection.query("INSERT INTO product (Prod_Name, Prod_AgeID, Prod_abv) VALUES (?, ?, ?)",[name, ageID, abv],function(err, rows, fields){
            if (err) reject(err);
            resolve({'retId' : rows.insertId});
        });
    })    
};

module.exports = router;
