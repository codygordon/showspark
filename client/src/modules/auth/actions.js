import AuthService from '../../utils/auth-service'

export const auth0 = new AuthService()

export const AUTH_FETCHING = 'AUTH_FETCHING_TOGGLE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE'
export const RECEIVE_LOGIN_HASH = 'RECEIVE_LOGIN_HASH'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'

const authFetching = () => ({
  type: AUTH_FETCHING
})

const loginSuccess = userProfile => ({
  type: LOGIN_SUCCESS,
  userProfile
})

const loginFailure = errorMessage => ({
  type: LOGIN_FAILURE,
  errorMessage
})

const passwordResetSuccess = alertMessage => ({
  type: PASSWORD_RESET_SUCCESS,
  alertMessage
})

const passwordResetFailure = errorMessage => ({
  type: PASSWORD_RESET_FAILURE,
  errorMessage
})

const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS
})

export function logOut() {
  return (dispatch) => {
    auth0.logOut()
    dispatch(logOutSuccess())
  }
}

export function receiveLoginHash(hash) {
  return (dispatch) => {
    auth0.parseHash(hash, (err, userProfile) => {
      if (err) dispatch(loginFailure(err.description))
      else dispatch(loginSuccess(userProfile))
    })
  }
}

export function loginWithFacebook() {
  return (dispatch) => {
    dispatch(authFetching())
    auth0.loginWithFacebook((err) => {
      if (err) dispatch(loginFailure(err.description))
    })
  }
}

export function loginOrSignupWithEmail(email, password, signUp, name) {
  return (dispatch) => {
    dispatch(authFetching())
    if (signUp) {
      auth0.signupWithEmail(email, password, name, (err, res) => {
        if (err) dispatch(loginFailure(err.description))
        else {
          auth0.loginWithEmail(email, password, (err, res) => {
            if (err) dispatch(loginFailure(err.description))
          })
        }
      })
    } else {
      auth0.loginWithEmail(email, password, (err, res) => {
        if (err) dispatch(loginFailure(err.description))
      })
    }
  }
}

export function resetPassword(email) {
  return (dispatch) => {
    dispatch(authFetching())
    auth0.resetPassword(email, (err, res) => {
      if (err) dispatch(passwordResetFailure(err.description))
      else dispatch(passwordResetSuccess(res))
    })
  }
}
