const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')

/* eslint-disable no-console */

dotenv.load()

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

    try {
      await Promise.all([
        localArtists.remove(),
        localVenues.remove(),
        localShows.remove()
      ])
      console.log('removed all local docs')
    } catch (err) { throw err }

    try {
      const docs = await Promise.all([
        prodArtists.find({}).toArray(),
        prodVenues.find({}).toArray(),
        prodShows.find({}).toArray()
      ])

      try {
        await Promise.all([
          localArtists.insertMany(docs[0]),
          localVenues.insertMany(docs[1]),
          localShows.insertMany(docs[2])
        ])
        console.log('saved all prod docs to dev')
      } catch (err) { throw err }
    } catch (err) { throw err }

    process.exit()
  })
})
