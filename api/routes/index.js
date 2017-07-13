var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var config = require('../config/config')

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

connection.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/productlines/get', (req, res)=> {
  const selectQuery = `SELECT * FROM productlines`
  connection.query(selectQuery, (error, results, fields)=> {
    if (error){
      res.json(error)
    }else{
      res.json(results)
    }
  })
})

module.exports = router;
