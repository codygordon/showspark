module.exports = (req, res) => {
  res.status(200).send({
    message: 'Welcome to the Showspark API!',
    version: '1.0'
  })
}
