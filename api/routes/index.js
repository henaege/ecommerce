var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var config = require('../config/config')
var stripe = require('stripe')(config.stripeKey)

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

router.get(`/productlines/:productLines/get`, (req, res)=> {
  const pl = req.params.productLines
  var plQuery = `SELECT * from productlines
                    INNER JOIN products ON productlines.productLine = products.productLine WHERE link = ?;`
  connection.query(plQuery, [pl], (error, results)=> {
    if (error) throw error
    
    res.json(results)
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

router.post('/getcart', (req, res)=> {
  const getUidQuery = `SELECT id from users WHERE token = ?;`
  connection.query(getUidQuery, [req.body.token], (error, results)=> {
    const getCartTotals = `Select sum(buyPrice) as totalPrice, count(buyPrice) as totalItems from cart INNER JOIN products ON products.productCode = cart.productCode WHERE uid=?;`
        connection.query(getCartTotals, [results[0].id], (error3, results3)=> {
          if(error3){
            res.json(error3)
          } else {
            const getCartContents = `SELECT * FROM cart INNER JOIN products on products.productCode = cart.productCode WHERE uid=?;`
            connection.query(getCartContents, [results[0].id], (error4, results4)=> {
              console.log(results4)
              var finalCart = results3[0]
              finalCart.products = results4
              res.json(finalCart)
            })
            
          }
        })
  })
})

router.post('/updateCart', (req, res)=> {
  console.log(req.body)
  const getUidQuery = `SELECT id from users WHERE token = ?;`
  connection.query(getUidQuery, [req.body.token], (error, results)=> {
    if(error) throw error
    if(results.length == 0) {
      res.json({msg: "badToken"})
    } else {
      const addToCartQuery = `INSERT INTO cart (uid, productCode) VALUES (?,?);`
      connection.query(addToCartQuery, [results[0].id, req.body.productCode], (error2, results2)=> {
        const getCartTotals = `Select sum(buyPrice) as totalPrice, count(buyPrice) as totalItems from cart INNER JOIN products ON products.productCode = cart.productCode WHERE uid=?;`
        connection.query(getCartTotals, [results[0].id], (error3, results3)=> {
          if(error3){
            res.json(error3)
          } else {
            res.json(results3[0])
          }
        })
      })
    }
  })
  
})

router.post('/login', (req, res)=> {
  var userName = req.body.userName
  var password = req.body.password
  var checkLoginQuery = 'SELECT * FROM users INNER JOIN customers ON users.uid  = customers.customerNumber WHERE username = ?;'
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
        const updateToken = `Update users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE username = ?;`
        var token = randToken.uid(40)
        connection.query(updateToken, [token, userName], (error2, results2)=> {
          res.json({
            msg: 'loginSuccess',
            name: results[0].customerName,
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

router.post('/stripe', (req, res)=> {
  var userToken = req.body.token
  var stripeToken = req.body.stripeToken
  var amount = req.body.amount
  // Stripe module which is associated with our secret key has a create method which takes an object of options to charge
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: stripeToken,
    description: "Charges for classic models"
  }, (error, charge)=> {
    if(error){
      res.json({msg: error})
    } else {
      // insert stuff from cart that was just paid into: orders, orderdetails
      res.json({msg: "paymentSuccess"})
    }
  })
})

module.exports = router;
