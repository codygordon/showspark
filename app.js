const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const sslRedirect = require('heroku-ssl-redirect ')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const handlers = require('./handlers')
// const jwksRsa = require('jwks-rsa')

dotenv.load()

const dbUrl = process.env.MLAB_DB_URL
const dbUser = process.env.MLAB_DB_USER
const dbPass = process.env.MLAB_DB_PASS

const mongoPath = process.env.NODE_ENV === 'production'
  ? `mongodb://${dbUser}:${dbPass}@${dbUrl}`
  : `mongodb://127.0.0.1:27017/${process.env.LOCAL_DB}`

const jwtCheck = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  issuer: process.env.AUTH0_ISSUER
}).unless({ path: ['/api/v1/token'] })

// const jwtCheck = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: process.env.AUTH0_JWKS_URI
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: process.env.AUTH0_ISSUER,
//   algorithms: ['RS256']
// })

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
      this.express.use(sslRedirect())
      /* serve all routes via client build if in prod env */
      this.express.use(express.static('client/build'))
      this.express.get('*', (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/client/build/index.html`))
      })
      /* and use production error handling */
      this.express.use(handlers.productionErrors)
    } else {
      /* otherwise, use development error handling */
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
    this.express.use((req, res) => (
      res.status(403).send({ message: 'you didn\'t say the magic word!' }))
    )
  }
}
