const mongoose = require('mongoose')

const User = mongoose.model('User')

exports.upsert = async (req, res) => {
  if (!req.body.auth0) throw new Error('valid data required in body')
  const user = await User.findOneAndUpdate({
    'auth0.user_id': req.body.auth0.user_id
  }, {
    $set: { ...req.body, modifiedDate: Date.now() }
  }, {
    upsert: true, new: true
  })
  res.send(user)
}

exports.getUserId = async (auth0Id) => {
  const user = await User.findOne({ 'auth0.user_id': auth0Id })
  if (!user) throw new Error('invalid user')
  return user._id
}

exports.checkAdminUser = async (auth0Id) => {
  const user = await User.findOne({ 'auth0.user_id': auth0Id, admin: true })
  if (!user) throw new Error('invalid user')
  return user._id
}
