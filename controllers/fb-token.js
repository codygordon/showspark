const request = require('request-promise-native')

module.exports = async (req, res) => {
  const url = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials'
  const id = `&client_id=${process.env.FB_APP_ID}`
  const secret = `&client_secret=${process.env.FB_APP_SECRET}`
  const fb = await request(`${url}${id}${secret}`)
  res.send({ token: JSON.parse(fb).access_token })
}
