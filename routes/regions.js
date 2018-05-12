var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var connection = req.db;
    connection.query('SELECT * FROM region', function(err, rows, fields) {
        res.json(rows);
    });
});

module.exports = router;
