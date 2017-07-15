var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var config = require('../config/config')

// include bcrypt for hashing and checking password
var bcrypt = require('bcrypt-nodejs')

// include rand-token for generating user token
var randToken = require('rand-token')

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

router.get('/products/:get', (req, res)=> {
  const selectQuery = `SELECT * FROM products INNER JOIN productlines ON productlines.link='${req.params.val}' and products.productLine = productlines.productLine;`
  connection.query(selectQuery, (error, results, fields)=> {
    if (error){
      res.json(error)
    }else{
      res.json(results)
    }
  })
})

router.post('/register', (req, res)=> {
  const name = req.body.name
  const email = req.body.email
  const accountType = req.body.accountType
  const password = bcrypt.hashSync(req.body.password)
  const confirmPassword = bcrypt.hashSync(req.body.confirmPassword)
  console.log(password)
  const city = req.body.city
  const state = req.body.state
  const userName = req.body.userName
  const salesRep = req.body.salesRep
  const creditLimit = 16000000

  // Check to see if userName exists
  connection.query("SELECT username FROM users", (error, results1)=>{
    
    if (error){
      error
    } else {
      var userNamesArray = []
      for (i = 0; i < results1.length; i++){
      userNamesArray.push(results1[i].username)
      }

      if (userNamesArray.includes(userName)){
        res.json({msg: "userExists"})
            
          
        } else {
          var insertIntoCust = "INSERT INTO customers (customerName, city, state, salesRepEmployeeNumber, creditLimit) VALUES (?,?,?,?,?);"
  // run the query
          connection.query(insertIntoCust, [name, city, state, 1337, creditLimit],(error, results)=>{
            // get the ID that was used in the customers insert
            const newID = results.insertId
            // get the current timestamp
            var currTimeStamp = parseInt(Date.now() / 1000)
            // Set up a token for this userName. We will give this back to react
            var token = randToken.uid(40)
            // users insert query
            var insertQuery = "INSERT INTO users (uid, accountType, password, created, token, username) VALUES (?,?,?,?,?,?);"
            // run the query. Use errors2 and results2 because we already used them
            connection.query(insertQuery, [newID, accountType, password, currTimeStamp, token, userName], (error2, results2)=>{
              if(error2){
                res.json({
                  msg: error2
                })
              } else {
                res.json({msg: "userInserted", token: token, name: name})
              }
            })
          })
        }
    }
  
  })      
}) 

  // We want to insert the user into 2 tanles: customers and users. Users need the customerNumber from the Customers HTMLTableAlignment. Therefore, we need to insert the user into Customers first, get the ID created by that insert, THEN insert the user into users

  // customers insert query
  

//   var insertQuery = "INSERT INTO users (accountType, password) VALUES (?,?);"
//   connection.query(insertQuery, [accountType, password], (error, results)=>{
//     if(error){
//       res.json({
//         msg: error
//       })
//       } else {
//         res.json({msg: "userInserted"})
//       }
//   })

router.post('/login', (req, res)=> {
  var userName = req.body.userName
  var password = req.body.password
  var checkLoginQuery = 'SELECT * FROM users WHERE username = ?;'
  connection.query(checkLoginQuery, [userName], (error, results)=> {
    if(error) throw error
    if(results.length == 0){
      res.json({
        msg: "User Name does not exist"
      })
    } else {
      var checkHash = bcrypt.compareSync(password, results[0].password)
      // checkHash always returns a boolean
      if (checkHash) {
        const updateToken = `Update users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR);`
        var token = randToken.uid(40)
        connection.query(updateToken, [token], (error2, results2)=> {
          res.json({
            msg: 'loginSuccess',
            name: results[0].name,
            token
          })
        })
      } else {
        res.json({
          msg: "wrongPassword"
        })
      }
    }
  })
})

module.exports = router;
