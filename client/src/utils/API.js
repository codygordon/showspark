import fetch from 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'

require('es6-promise').polyfill()

const API = {
  get(dataType, cb, query) {
    this.getToken((token) => {
      let path;
      !query ? path = `/api/${dataType}` : path = `/api/${dataType}${query}`
      return fetch(path, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }).then(this.checkStatus)
        .then(this.parseJSON)
        .then(cb)
    });
  },

  post(dataType, data, cb, query) {
    this.getToken((token) => {
      let path;
      !query ? path = `/api/${dataType}` : path = `/api/${dataType}${query}`
      return fetch(path, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }).then(this.checkStatus)
        .then(this.parseJSON)
        .then(cb)
    })
  },

  getToken(cb) {
    if (localStorage.apiToken) {
      const token = localStorage.apiToken
      const decoded = jwtDecode(token)
      if (decoded.exp > Date.now() / 1000) return cb(token)
    }
    this.requestToken((res) => {
      localStorage.setItem('apiToken', res.access_token)
      return cb(res.access_token)
    })
  },

  requestToken(cb) {
    let clientId;
    let clientSecret;
    if (process.env.NODE_ENV === 'production') {
      clientId = process.env.AUTH0_CLIENT_ID
      clientSecret = process.env.AUTH0_CLIENT_SECRET
    } else {
      /* eslint-disable global-require */
      clientId = require('./devConfig').AUTH0_CLIENT_ID
      clientSecret = require('./devConfig').AUTH0_CLIENT_SECRET
      /* eslint-enable global-require */
    }
    const body = `client_id=${clientId}&client_secret=${clientSecret}`
    return fetch('/api/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    }).then(this.checkStatus)
      .then(this.parseJSON)
      .then(cb)
  },

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    console.log(error) // eslint-disable-line no-console
    throw error
  },

  parseJSON(response) {
    return response.json()
  }
}

export default API
