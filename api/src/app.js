require('./mongo')
const cors = require('cors')
const express = require('express')
const path = require('path')
const server = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const debug = require('./routes/debug')
const automatic_post = require('./routes/automatic-post')
// Middlewares to catch errors
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors.js')
const fileUpload = require('express-fileupload')

//INTEGRATION WITH SENTRY
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

require('./db.js')

server.name = 'API'

Sentry.init({
  dsn: 'https://4608b53442a144a992b84d76eee6a03b@o1240796.ingest.sentry.io/6394065',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ server }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
server.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
server.use(Sentry.Handlers.tracingHandler())

//All middlewares should live here
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use(fileUpload())
server.use(express.static('assets'))

// All controllers should live here
server.use('/api', routes)

server.use('/debug', debug)

server.use('/post', automatic_post)

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://weattend.com.ar')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
  next()
})

// The error handler must be before any other error middleware and after all controllers
server.use(notFound)
server.use(Sentry.Handlers.errorHandler())
server.use(handleErrors)

// Optional fallthrough error handler
server.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
