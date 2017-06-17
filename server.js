const http = require('http')
const App = require('./app')

const app = new App()
const port = process.env.PORT || 3001

http.createServer(app.express).listen(port, (err) => {
  if (err) throw err
  if (process.env.NODE_ENV !== 'production') {
    console.log(`\nServer connected at http://localhost:${port}/`) // eslint-disable-line
  }
})
