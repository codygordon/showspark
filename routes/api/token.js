const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res, next) => {
  if (req.host !== ('localhost' || 'showspark.herokuapp.com')) {
    res.status(400)
    res.send({ message: `${req.host} is not an approved host!` })
  } else {
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
      if (error) res.send(JSON.parse(error))
      else res.send(JSON.parse(body))
    })
  }
})

router.post('/', (req, res, next) => {
  res.send({ message: 'Use GET to request token.' })
})

module.exports = router
