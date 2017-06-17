import auth0 from 'auth0-js'
import decode from 'jwt-decode'

/* eslint-disable class-methods-use-this */
export default class AuthService {
  constructor() {
    // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: 'gFHlpDzCR3GFtvT1QPRpKXKLb9mRftih',
      domain: 'showspark.auth0.com',
      responseType: 'token id_token'
    })

    this.login = this.login.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(username, password, uri, cb) {
    // redirects the call to auth0 instance
    this.auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password,
      redirect_uri: uri
    }, err => cb(err))
  }

  loginWithGoogle(uri, cb) {
    this.auth0.authorize({
      connection: 'google-oauth2',
      redirect_uri: uri
    }, err => cb(err))
  }

  loginWithFacebook(uri, cb) {
    this.auth0.authorize({
      connection: 'facebook-oauth2',
      redirect_uri: uri
    }, err => cb(err))
  }

  signup(username, password, cb) {
    // redirects the call to auth0 instance
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      username,
      password
    }, err => cb(err))
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('user_profile')
  }

  parseHash(hash) {
    this.auth0.parseHash({ hash, _idTokenVerification: false },
      (err, authResult) => {
        if (err) throw err
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setToken(authResult.accessToken, authResult.idToken)
          this.auth0.client.userInfo(authResult.accessToken,
            (err, profile) => {
              if (err) console.log('Error loading the Profile', err)
              else this.setProfile(profile)
            })
        }
      })
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('user_profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('user_profile')
    return profile ? JSON.parse(localStorage.profile) : {}
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
