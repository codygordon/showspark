const express = require('express')
const http = require('http')
const path = require('path')
const RateLimit = require('express-rate-limit')
const logger = require('morgan')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const mongo = require('./utils/mongo-connection')

const app = express()
const port = process.env.PORT || 3001

const limiter = new RateLimit({
  windowMs: 1000,
  max: 5,
  delayMs: 0
})

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
}).unless({ path: ['/api/token'] })

/* start server only if MongoDB is connected */
mongo.connectToServer(() => {
  http.createServer(app).listen(port, (err) => {
    // eslint-disable-next-line
    console.log(`Server connected at http://localhost:${port}/`)

    /* api limiter and token authentication */
    app.use('/api', limiter)
    app.use('/api', jwtCheck,
      (err, req, res, next) => {
        if (err) res.status(err.status).send({ message: err.message })
      })

    /* routes to be imported */
    /* eslint-disable global-require */
    app.use('/api', require('./routes/api/index'))
    app.use('/api/token', require('./routes/api/token'))
    app.use('/api/venues', require('./routes/api/venues'))

    /* serve all routes via react build if in prod */
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'))
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/client/build/index.html`))
      })
    } else {
      app.use(logger('dev'))
    }
  })
})
