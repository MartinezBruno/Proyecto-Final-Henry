require("./mongo")
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

const server = express()
const cors = require('cors')

server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
server.use(bodyParser.json({limit: '50mb'}))
server.use(cookieParser())
server.use(morgan('dev'))
server.use((req, res, next) => {
   res.header('Access-Control-Allow-Credentials', true)
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token',
   )
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
   next()
})

server.use('/', routes)

server.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || err
   console.log(err)
   res.status(status).send(message)
})

module.exports = server
