const express = require('express')
const bodyParser = require('body-parser')

const mongo = require('../../utils/mongo-connection')
const stateNameAbbrev = require('../../utils/state-name-abbrev')

const router = express.Router()
const db = mongo.getDb()
const venues = db.collection('venues')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  let query = {}
  if (req.query && req.query.city && req.query.state) {
    const city = req.query.city.replace(/%20/g, ' ').trim()
    let state = req.query.state.replace(/%20/g, ' ').trim()
    if (state.length > 2) {
      state = stateNameAbbrev(state)
    }
    query = {
      'address.city': city,
      'address.state': state
      // TODO: add address.country field to dataset
    }
  }
  venues.find(query).toArray((err, result) => {
    if (err) throw err
    if (result) {
      return res.json(result)
    }
    return res.json({ error: 'Zero results. Try refining your query.' })
  })
})

router.post('/', (req, res) => {

})

module.exports = router
