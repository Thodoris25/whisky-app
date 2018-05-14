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

    let ageID = null;

    connection.query("SELECT Age_ID FROM age WHERE Age_Value = ?",[age],function(err, rows, fields){
        if(rows.length != 0){
            ageID = rows[0].Age_ID;
        }else{
            connection.query("INSERT INTO age (Age_Value) VALUES (?)",[age],function(err, rows, fields){
                if (err) throw err;
                ageID = rows.insertId;
                console.log("1 age record inserted");
            });
        }
    });

    connection.query("INSERT INTO product (Prod_Name, Prod_AgeID, Prod_abv) VALUES (?, ?, ?)",[name, ageID, abv],function(err, rows, fields){
        if (err) throw err;
        console.log("1 product record inserted");
        res.json({'retId' : rows.insertId});
    });
});

module.exports = router;
