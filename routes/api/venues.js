const express = require('express')
const bodyParser = require('body-parser')
const NodeGeocoder = require('node-geocoder')
const ObjectId = require('mongodb').ObjectId

const mongo = require('../../utils/mongo-connection')
const stateNameAbbrev = require('../../utils/state-name-abbrev')

const router = express.Router()
const db = mongo.getDb()
const venues = db.collection('venues')
const geocoder = NodeGeocoder({
  provider: 'google',
  httpAdapter: 'https',
  formatter: null
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  if (req.query && req.query.city && req.query.state) {
    // const country = req.query.country.replace(/%20/g, ' ')
    const city = req.query.city.replace(/%20/g, ' ')
    let state = req.query.state.replace(/%20/g, ' ')
    if (state.length > 2) {
      state = stateNameAbbrev(state)
    }
    const query = {
      'address.city': city,
      'address.state': state
    }

    venues.find(query).toArray((err, result) => {
      if (err) throw err
      if (result) {
        let data = result
        let pages = 1
        const total = result.length

        if (req.query.limit && req.query.offset) {
          const offset = parseInt(req.query.offset)
          const limit = parseInt(req.query.limit)

        data = result.filter((item, i) => { // eslint-disable-line
          if (i >= offset && i < (limit + offset)) return true
          return false
        })
          pages = Math.ceil(result.length / limit)
          return res.json({ data, pages, total })
        }
        return res.json({ data, pages, total })
      }
      return res.json({ error: 'Zero results. Try refining your query.' })
    })
  }

  if (req.query && req.query.venueId) {
    venues.findOne({ _id: ObjectId(req.query.venueId) }, (err, result) => {
      if (err) throw err
      if (!result) {
        return res.json({ errorMessage: 'no match' })
      } else { // eslint-disable-line
        return res.json(result)
      }
    })
  }
})

router.post('/', (req, res) => {
  if (req.query && req.query.clean) {
    /* eslint-disable no-console */
    /* eslint-disable consistent-return */
    venues.find({}).toArray((err, venuesArr) => {
      if (err) return res.send({ message: 'Error querying venues' })
      console.log('Cleaning venues...')
      let i = 0

      function rateLimitGeocode() { // eslint-disable-line
        const venue = venuesArr[i]
        if (venue.address && (!venue.address.lat || !venue.address.lng)) {
          const addrString = `${venue.address.street} ${venue.address.city}, ${venue.address.state} ${venue.address.zip}`
          geocoder.geocode(addrString, (err, geoRes) => {
            if (err) throw err
            // clean the genres and phone fields
            const cleanedPhone = venue.phone.replace(/\D/g, '')
            const cleanedGenres = venue.genres.map(genre => genre.trim())
            if (geoRes.length >= 1) {
              venues.update({ _id: venue._id }, {
                $set: {
                  'address.lat': geoRes[0].latitude,
                  'address.lng': geoRes[0].longitude,
                  'address.country': geoRes[0].country,
                  phone: cleanedPhone,
                  genres: cleanedGenres,
                  updated_at: new Date()
                }
              }, (err, object) => {
                i += 1
                if (err) return console.log(`Error saving ${venue.title}, skipping.`)
                console.log(`Geocoded and cleaned ${venue.title}!\n${object}`)
                if (i >= venuesArr.length) return res.send({ message: 'Done cleaning!' })
                return rateLimitGeocode()
              })
            } else {
              i += 1
              console.log(`No geocoding result for ${venue._id}`)
              return rateLimitGeocode()
            }
          })
        } else {
          i += 1
          return rateLimitGeocode()
        }
      }

      geocoder.geocode('11205', (err) => {
        if (err) throw err
        rateLimitGeocode()
      })
    })
  }
})

module.exports = router
