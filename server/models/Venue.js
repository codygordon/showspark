const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const NodeGeocoder = require('node-geocoder')

const geocoder = NodeGeocoder({ provider: 'google' })

const VenueSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  neighborhood: String,
  latitude: Number,
  longitude: Number,
  capacity: { type: String, required: true },
  ages: { type: String, required: true },
  showTypes: [{ type: String, required: true }],
  preferredGenres: [{ type: String, required: true }],
  webUrl: String,
  email: String,
  photoUrl: String,
  profiles: [{
    provider: { type: String, required: true },
    url: { type: String, required: true },
    handle: { type: String, required: true }
  }],
  createdDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date }
})

VenueSchema.pre('save', async function(next) {
  // TODO: Facebook API search to get profile data & cover photo
  // TODO: Yelp API search to get neighborhood
  try {
    // prevent dupes on name + zip
    const found = await this.constructor.findOne({ name: this.name, zip: this.zip })
    if (found) next(new Error('venue already exists'))
  } catch (err) { throw err }

  // if (!this.latitude || !this.longitude) {
  //   // geocode if it doesn't already have lat / lng
  //   try {
  //     const geocoded = await geocoder.geocode(`${this.address}, ${this.city}, ${this.state} ${this.zip}`)
  //     this.latitude = geocoded[0].latitude
  //     this.longitude = geocoded[0].longitude
  //   } catch (err) { throw err }
  // }
  this.modifiedDate = Date.now()
  next()
})

module.exports = mongoose.model('Venue', VenueSchema)
