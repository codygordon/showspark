const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

// this has been changed

const ArtistSchema = new Schema({
  name: { type: String, required: true, unique: true },
  facebookPage: { type: Object, required: true },
  artistType: { type: String, default: 'band' }, // band, dj, singer-songwriter, etc.
  homeCity: { type: String },
  genres: [{ type: String }],
  memberCount: { type: Number },
  instruments: [{ type: String }],
  website: String,
  owners: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date }
})

ArtistSchema.pre('save', function(next) {
  this.modifiedDate = Date.now()
  next()
})

module.exports = mongoose.model('Artist', ArtistSchema)
