const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const sslRedirect = require('heroku-ssl-redirect')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const handlers = require('./handlers')

dotenv.load()

const dbUrl = process.env.MLAB_DB_URL
const dbUser = process.env.MLAB_DB_USER
const dbPass = process.env.MLAB_DB_PASS

const productionOrStaging = process.env.NODE_ENV === 'production'
  || process.env.NODE_ENV === 'staging'

const mongoPath = productionOrStaging
  ? `mongodb://${dbUser}:${dbPass}@${dbUrl}`
  : `mongodb://127.0.0.1:27017/${process.env.LOCAL_DB}`

const jwtCheck = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  issuer: process.env.AUTH0_ISSUER
}).unless({ path: ['/api/v1/token'] })

mongoose.connect(mongoPath)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => { if (err) throw err })
require('./models/User')
require('./models/Artist')
require('./models/Venue')
require('./models/Show')

module.exports = class App {
  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
  }

  middleware() {
    this.express.use(morgan('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    if (process.env.NODE_ENV === 'production') {
      /* redirect to https in prod */
      this.express.use(sslRedirect())
      /* and use production error handling */
      this.express.use(handlers.productionErrors)
    } else {
      /* otherwise, use dev error handling */
      this.express.use(handlers.developmentErrors)
    }
  }

  routes() {
    /* token authentication check on API routes */
    this.express.use('/api/v1', jwtCheck, (err, req, res, next) => {
      if (err) res.status(err.status).send({ message: err.message })
    })
    /* routes to be imported */
    this.express.use('/api/v1', require('./routes/api/v1/index'))
    if (productionOrStaging) {
      /* serve all other routes via client build if in prod / staging env */
      this.express.use(express.static('client/build'))
      this.express.get('*', (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/client/build/index.html`))
      })
    }
  }
}
