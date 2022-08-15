const express = require('express')
const mysql = require('mysql') 
const router = express.Router()
const crypt = require('bcryptjs')
const salt = crypt.genSaltSync(10)

var sqlcon = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bancolinux',
  multipleStatements: true,
})

router.get('/', (req, res) => {
  sqlcon.query('SELECT * FROM users', (err, rows, fields) => {
    if(!err){
      res.send({
        status: 'OK',
        rows: rows,
      })
    }
    else{
      res.send({
        status: "NOT GOOD!", 
        err: err,
      })
    } 
  })
})

router.post('/create', (req, res) => {
  console.log(req.body)
  
  let password = req.body.password.value
  password = crypt.hashSync(password, salt)

  sqlcon.query('INSERT INTO users (email, password, usuario, imagem) values (?, ?, ?, ?)', [req.body.email.value, password , req.body.username.value, req.body.imagem.value], (err, rows, fields) => {
    if(!err){
      res.send({
        status: 'OK',
        rows: rows,
      })
    }
    else{
      res.send({
        status: "NOT GOOD!",
        err: err,
      })
    }
  })
})

router.post('/login', (req, res) => {

  sqlcon.query('SELECT password, usuario FROM users WHERE usuario = ?', [req.body.username.value, req.body.password.value], (err, rows, fields) => {
    console.log(crypt.compareSync(req.body.password.value, rows[0].password))
    // if(crypt.compareSync(req.body.password.value, row.password)){
          
    // }
    if(!err){
      if(crypt.compareSync(req.body.password.value, rows[0].password) && req.body.username.value == rows[0].usuario){
        res.send({
          status: 'OK',
          rows: rows,
        })
      }
      else{
        res.statusMessage = "incorrect password or username!"
        res.status(403).json({status:"bad"})
      }
    }
    else{
      res.send({
        status: "NOT GOOD!",
        err: err,
      })
    }
  })
})

module.exports = router

