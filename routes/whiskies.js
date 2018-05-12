var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var connection = req.db;
    connection.query('SELECT p.Prod_ID, p.Prod_Name, p.Prod_abv, a.Age_Value as Prod_Age FROM product p\
    INNER JOIN age a ON p.Prod_AgeID = a.Age_ID', function(err, rows, fields) {
        res.json(rows);
    });
});

module.exports = router;
