const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

/* eslint-disable no-console */

const localMongo = `mongodb://127.0.0.1:27017/${process.env.LOCAL_DB}`
const mlabCreds = `${process.env.MLAB_DB_USER}:${process.env.MLAB_DB_PASS}`
const prodMongo = `mongodb://${mlabCreds}@${process.env.MLAB_DB_URL}`

mongoose.connect(localMongo)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => { if (err) throw err })
require('../models/Venue')

const Venue = mongoose.model('Venue')

MongoClient.connect(prodMongo, async (err, db) => {
  const prodVenue = db.collection('venues')

  const saveFromProd = async (venue) => {
    if (venue.title) {
      const newVenue = new Venue({
        name: venue.title,
        address: venue.address.street,
        city: venue.address.city,
        state: venue.address.state,
        zip: venue.address.zip,
        latitude: venue.address.lat,
        longitude: venue.address.lng,
        showTypes: venue.genres,
        webUrl: venue.web,
        capacity: venue.capacity,
        ages: venue.ages,
        createdAt: venue.created_at
      })
      try {
        const saved = await newVenue.save()
        console.log(saved)
      } catch (err) { console.error(err) }
    }
  }

  try {
    const prodVenues = await prodVenue.find()
    prodVenues.forEach((venue) => {
      saveFromProd(venue)
    })
  } catch (err) { console.error(err) }
})
