import auth0 from 'auth0-js'
import decode from 'jwt-decode'

const redirectUri = process.env.NODE_ENV === 'production'
  ? 'https://www.showspark.com/login'
  : (process.env.NODE_ENV === 'staging'
    ? 'http://staging.showspark.com/login'
    : 'http://localhost:3000/login')


/* eslint-disable class-methods-use-this */
export default class AuthService {
  constructor() {
    this.webAuth = new auth0.WebAuth({
      clientID: 'gFHlpDzCR3GFtvT1QPRpKXKLb9mRftih',
      domain: 'showspark.auth0.com',
      responseType: 'token id_token',
      scope: 'email profile',
      redirectUri
    })

    this.signupWithEmail = this.signupWithEmail.bind(this)
    this.loginWithEmail = this.loginWithEmail.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
  }

  signupWithEmail(email, password, name, cb) {
    this.webAuth.signup({
      connection: 'Username-Password-Authentication',
      email,
      password,
      user_metadata: {
        name
      }
    }, cb)
  }

  loginWithEmail(username, password, cb) {
    this.webAuth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password
    }, cb)
  }

  resetPassword(email, cb) {
    this.webAuth.changePassword({
      connection: 'Username-Password-Authentication',
      email
    }, cb)
  }

  loginWithGoogle(cb) {
    this.webAuth.authorize({
      connection: 'google-oauth2'
    }, cb)
  }

  loginWithFacebook(cb) {
    this.webAuth.authorize({
      connection: 'facebook'
    }, cb)
  }

  logOut() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('user_profile')
  }

  parseHash(hash, cb) {
    this.webAuth.parseHash({ hash, _idTokenVerification: false },
      (err, authResult) => {
        if (err) cb(err)
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setToken(authResult.accessToken, authResult.idToken)
          this.webAuth.client.userInfo(authResult.accessToken, (err, profile) => {
            this.setUserProfile(profile)
            cb(err, profile)
          })
        } else cb(err = new Error('login failed'))
      })
  }

  setUserProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('user_profile', JSON.stringify(profile))
  }

  getUserProfile() {
    // Retrieves the profile data from localStorage
    const profile = JSON.parse(localStorage.getItem('user_profile'))
    return profile
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid, returns bool
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    // Saves user token to local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  isTokenValid(token) {
    try {
      decode(token)
      return true
    } catch (err) { return false }
  }

  getTokenExpirationDate(token) {
    const decoded = decode(token)
    if (!decoded.exp) {
      return null
    }

    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired(token) {
    const date = this.getTokenExpirationDate(token)
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}
