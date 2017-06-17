const mongoose = require('mongoose')
const { getUserId } = require('./users')

const Artist = mongoose.model('Artist')

exports.saveNew = async (req, res) => {
  if (!req.body.name) throw new Error('valid data required in body')
  const userId = await getUserId(req.user.sub)
  const newArtist = new Artist({ ...req.body, owners: [userId] })
  const saved = await newArtist.save()
  res.send(saved)
}

exports.saveExisting = async (req, res) => {
  if (!req.body.name) throw new Error('valid data required in body')
  const userId = await getUserId(req.user.sub)
  const saved = await Artist.findOneAndUpdate({
    _id: req.params.id,
    owners: userId
  }, { $set: {
    ...req.body,
    modifiedDate: Date.now()
  } }, { new: true })
  res.send(saved)
}

exports.findById = async (req, res) => {
  const userId = await getUserId(req.user.sub)
  const artist = await Artist.findOne({ _id: req.params.id, owners: userId })
  if (!artist) throw new Error('artist doesn\'t exist')
  res.send(artist)
}
