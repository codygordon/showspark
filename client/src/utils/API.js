import fetch from 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'

require('es6-promise').polyfill()

const API = {
  get(dataType, query, cb) {
    this.getToken((token) => {
      let path = `/api/${dataType}`
      if (query) {
        const queryItems = Object.entries(query)

        queryItems.forEach((queryItem, i) => {
          if (i === 0) path += `?${queryItem[0]}=${queryItem[1]}`
          else path += `&${queryItem[0]}=${queryItem[1]}`
        })
      }

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

  post(dataType, data, query, cb) {
    this.getToken((token) => {
      let path = `/api/${dataType}`
      if (query) {
        const queryItems = Object.entries(query)

        queryItems.forEach((queryItem, i) => {
          if (i === 0) path += `?${queryItem[0]}=${queryItem[1]}`
          else path += `&${queryItem[0]}=${queryItem[1]}`
        })
      }

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

  getToken(cb) { // eslint-disable-line consistent-return
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
    return fetch('/api/token', {
      method: 'get'
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
