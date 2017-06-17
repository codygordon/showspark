const jwtSign = require('jsonwebtoken').sign

module.exports = (req, res) => {
  const token = jwtSign({
    key: 'public-api '
  }, process.env.AUTH0_CLIENT_SECRET, {
    issuer: process.env.AUTH0_ISSUER,
    expiresIn: '1h'
  })
  res.send(token)
}
