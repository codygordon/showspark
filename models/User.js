const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const UserSchema = new Schema({
  auth0: { user_id: { type: String, index: true } },
  admin: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now() },
  modifiedDate: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('User', UserSchema)
