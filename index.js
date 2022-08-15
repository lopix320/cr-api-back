const express = require('express') // importa o express
const app = express() // instancia do express
const mysql = require('mysql') // importa o mysql       
const userRoute = require('./routes/user')
const cors = require('cors')

app.use(cors())

app.use(express.json())

var sqlcon = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bancolinux',
  multipleStatements: true,
})

sqlcon.connect((err) => {
  if(!err) console.log(`Seu aplicativo vai rodar na porta http://localhost:8887`)
  else console.log(err)
})

app.listen(8887, () => console.log('rodando na porta 8887'))

app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.json({
    'Bem vindo': [
      'Chato',
      'Legal',
      'Maravilhoso',
      'Curti',
    ]
  })
})
