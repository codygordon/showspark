const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.put('/', (req, res, next) => {
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
      res.status(400).send(JSON.parse(error))
    } else res.send(JSON.parse(body))
  })
})

router.get('/', (req, res, next) => {
  res.status(400).send({ message: 'Bad request...' })
})

router.post('/', (req, res, next) => {
  res.status(400).send({ message: 'Bad request...' })
})

module.exports = router
