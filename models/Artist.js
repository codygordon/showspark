const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  artistType: { type: String, required: true }, // band, dj, singer-songwriter, etc.
  homeCity: { type: String, required: true }, // use places autocomplete
  genres: [{ type: String, required: true }],
  memberCount: { type: Number, required: true },
  instruments: [{ type: String, required: true }],
  profiles: [{
    provider: { type: String, required: true },
    url: { type: String, required: true },
    handle: { type: String, required: true }
  }],
  owners: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  createdDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date }
})

ArtistSchema.pre('save', function(next) {
  this.modifiedDate = Date.now()
  next()
})

module.exports = mongoose.model('Artist', ArtistSchema)
