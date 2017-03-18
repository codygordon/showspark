const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cors = require('cors')
const http = require('http')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const mongo = require('./utils/mongo-connection')

const app = express()
const port = process.env.PORT || 3001

const jwtCheck = jwt({
  /* dynamically provide a signing key based on the kid in the header
  and the singing keys provided by the Auth0 JWKS endpoint */
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),

  // validate the Auth0 audience and the issuer
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
}).unless({ path: ['/api/token'] })

app.use(cors())
app.use(favicon(`${__dirname}/public/favicon.ico`))
app.use(logger('dev'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

mongo.connectToServer((err) => {
  if (err) throw err

  console.log(`Server connected at http://localhost:${port}/`) // eslint-disable-line no-console

  /* start server only if MongoDB is connected */
  http.createServer(app).listen(port, (err) => {
    app.get('/', (req, res) => {
      res.send({ message: 'Server online!' })
    })

    /* token authentication */
    app.use('/api', jwtCheck,
      (err, req, res, next) => {
        if (err) res.status(err.status).send({ message: err.message })
      })

    // routes imported
    /* eslint-disable global-require */
    app.use('/api', require('./routes/api/index'))
    app.use('/api/token', require('./routes/api/token'))
    app.use('/api/venues', require('./routes/api/venues'))

    app.use((req, res) => {
      res.status(400)
      res.send({ message: 'Bad request...' })
    })
  })
})
