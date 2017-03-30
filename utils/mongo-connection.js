const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient

if (process.env.NODE_ENV !== 'production') dotenv.load()

const dbUrl = process.env.MLAB_DB_URL
const dbUser = process.env.MLAB_DB_USER
const dbPass = process.env.MLAB_DB_PASS
let mongoPath = `mongodb://${dbUser}:${dbPass}@${dbUrl}`

if (process.env.NODE_ENV !== 'production') {
  // use local mongodb i instance if not in prod
  mongoPath = 'mongodb://127.0.0.1:27017/showspark'
}

let db = null

module.exports = {
  connectToServer(callback) {
    MongoClient.connect(mongoPath, (err, database) => {
      if (err) throw err
      db = database
      return callback()
    })
  },

  getDb() {
    return db
  }
}
