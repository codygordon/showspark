const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res, next) => {
  const prodEnv = process.env.NODE_ENV === 'production'
  const prodHost = 'showspark.herokuapp.com'
  if ((!prodEnv && req.hostname === 'localhost') ||
  (!!prodEnv && req.hostname === prodHost)) {
    const options = {
      method: 'POST',
      url: `${process.env.AUTH0_ISSUER}oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: `{"client_id":"${process.env.AUTH0_CLIENT_ID}",\
      "client_secret":"${process.env.AUTH0_CLIENT_SECRET}",\
      "audience":"${process.env.AUTH0_AUDIENCE}",\
      "grant_type":"client_credentials"}`
    }

    request(options, (error, response, body) => {
      if (error) {
        res.status(400)
        res.send(JSON.parse(error))
      } else res.send(JSON.parse(body))
    })
  } else {
    res.status(400)
    res.send({ message: `${req.hostname} is not an approved host!` })
  }
})

router.post('/', (req, res, next) => {
  res.send({ message: 'Use GET to request token.' })
})

module.exports = router
