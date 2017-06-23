const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

/* eslint-disable no-console */

const localMongo = `mongodb://127.0.0.1:27017/${process.env.LOCAL_DB}`
const mlabCreds = `${process.env.MLAB_DB_USER}:${process.env.MLAB_DB_PASS}`
const prodMongo = `mongodb://${mlabCreds}@${process.env.MLAB_DB_URL}`

MongoClient.connect(prodMongo, async (err, db) => {
  const prodDb = db
  const prodArtists = prodDb.collection('artists')
  const prodVenues = prodDb.collection('venues')
  const prodShows = prodDb.collection('shows')

  MongoClient.connect(localMongo, async (err, db) => {
    const localDb = db
    const localArtists = localDb.collection('artists')
    const localVenues = localDb.collection('venues')
    const localShows = localDb.collection('shows')

    try { await localArtists.remove() } catch (err) { console.error(err) }
    try { await localVenues.remove() } catch (err) { console.error(err) }
    try { await localShows.remove() } catch (err) { console.error(err) }

    try {
      const docs = await prodArtists.find()
      try {
        await localArtists.insertMany(docs)
        console.log('done with artists')
      } catch (err) { console.error(err) }
    } catch (err) { console.error(err) }

    try {
      const docs = await prodVenues.find()
      try {
        await localVenues.insertMany(docs)
        console.log('done with venues')
      } catch (err) { console.error(err) }
    } catch (err) { console.error(err) }

    try {
      const docs = await prodShows.find()
      try {
        await localShows.insertMany(docs)
        console.log('done with shows')
      } catch (err) { console.error(err) }
    } catch (err) { console.error(err) }
  })
})
