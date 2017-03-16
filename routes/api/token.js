const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res, next) => {
  res.send({ message: 'Use POST to send Client ID and Secret.' })
})

router.post('/', (req, res, next) => {
  if (!req.body.client_id || !req.body.client_secret) {
    res.status(400)
    res.send({ message: 'Client ID or Client Secret missing' })
  } else {
    const options = {
      method: 'POST',
      url: `${process.env.AUTH0_ISSUER}oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: `{"client_id":"${req.body.client_id}",\
      "client_secret":"${req.body.client_secret}",\
      "audience":"${process.env.AUTH0_AUDIENCE}",\
      "grant_type":"client_credentials"}`
    }

    request(options, (error, response, body) => {
      if (error) console.log(error) // eslint-disable-line
      res.send(JSON.parse(body));
    })
  }
})

module.exports = router
