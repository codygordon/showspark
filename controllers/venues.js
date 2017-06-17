const mongoose = require('mongoose')
const { checkAdminUser } = require('./users')
const sphere = require('sphere-knn')

const Venue = mongoose.model('Venue')

exports.saveNew = async (req, res) => {
  if (!req.body.name) throw new Error('valid data required in body')
  await checkAdminUser(req.user.sub)
  const newVenue = new Venue({ ...req.body })
  const saved = await newVenue.save()
  res.send(saved)
}

exports.saveExisting = async (req, res) => {
  if (!req.body.name) throw new Error('valid data required in body')
  await checkAdminUser(req.user.sub)
  const saved = await Venue.findOneAndUpdate({
    _id: req.params.id
  }, { $set: {
    ...req.body,
    modifiedDate: Date.now()
  } }, { new: true })
  res.send(saved)
}

exports.findByProximity = async (req, res) => {
  if (!req.query.latitude || !req.query.longitude) {
    throw new Error('latitude and longitude required in query')
  }
  const searchLat = req.query.latitude
  const searchLng = req.query.longitude
  const proximity = 40000 // ~25 miles in meters
  const maxResults = 100
  const venues = await Venue.find({})
  const lookup = sphere(venues.map(venue => venue._doc))
  const filtered = lookup(searchLat, searchLng, maxResults, proximity)
  res.send(filtered)
}

exports.findById = async (req, res) => {
  const venue = await Venue.findOne({ _id: req.params.id })
  if (!venue) throw new Error('venue doesn\'t exist')
  res.send(venue)
}
