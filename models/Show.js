const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const ShowSchema = new Schema({
  dateTime: { type: Date, required: true },
  artists: { type: [mongoose.Schema.ObjectId], ref: 'Artist', required: true },
  venue: { type: mongoose.Schema.ObjectId, ref: 'Venue', required: true },
  ticketPrice: String,
  createdDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date }
})

ShowSchema.pre('save', async function(next) {
  try {
    // prevent dupes on dateTime + venue
    const found = await this.constructor.findOne({
      dateTime: this.dateTime,
      venue: this.venue
    })
    if (found) next(new Error('show already exists'))
  } catch (err) { throw err }

  this.modifiedDate = Date.now()
  next()
})

module.exports = mongoose.model('Show', ShowSchema)
