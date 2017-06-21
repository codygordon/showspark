const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  facebookPage: {},
  artistType: { type: String }, // band, dj, singer-songwriter, etc.
  homeCity: { type: String },
  genres: [{ type: String }],
  memberCount: { type: Number },
  instruments: [{ type: String }],
  owners: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
  createdDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date }
})

ArtistSchema.pre('save', function(next) {
  this.modifiedDate = Date.now()
  next()
})

module.exports = mongoose.model('Artist', ArtistSchema)
