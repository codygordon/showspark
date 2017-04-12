import { auth0, initialState } from '../../store'

/* ACTION TYPES */

export const SHOW_LOG_IN = 'auth/SHOW_LOG_IN'
export const CLOSE_LOG_IN = 'auth/CLOSE_LOG_IN'
export const SHOW_SIGN_UP = 'auth/SHOW_SIGN_UP'
export const CLOSE_SIGN_UP = 'auth/CLOSE_SIGN_UP'
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE'
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
export const USER_REQUEST = 'auth/USER_REQUEST'
export const USER_SUCCESS = 'auth/USER_SUCCESS'
export const USER_FAILURE = 'auth/USER_FAILURE'

/* REDUCERS */

export default function reducer(state = initialState.auth, action) {
  switch (action.type) {
    case SHOW_LOG_IN:
      return {
        ...state,
        showingLogIn: true
      }
    case CLOSE_LOG_IN:
      return {
        ...state,
        showingLogIn: false
      }
    case SHOW_SIGN_UP:
      return {
        ...state,
        showingSignUp: true
      }
    case CLOSE_SIGN_UP:
      return {
        ...state,
        showingSignUp: false
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: null,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: null
      }
    case USER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        user: action.user
      }
    case USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }
    default:
      return state
  }
}

/* Normal Actions */

export function showLogIn() {
  return {
    type: SHOW_LOG_IN,
    showingLogIn: true
  }
}

export function closeLogIn() {
  return {
    type: CLOSE_LOG_IN,
    showingLogIn: false
  }
}

export function showSignUp() {
  return {
    type: SHOW_SIGN_UP,
    showingSignUp: true
  }
}

export function closeSignUp() {
  return {
    type: CLOSE_SIGN_UP,
    showingSignUp: false
  }
}

export function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveSignup() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  }
}

export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function requestUser() {
  return {
    type: USER_REQUEST,
    isFetching: true
  }
}

export function receiveUser(user) {
  return {
    type: USER_SUCCESS,
    isFetching: false,
    user
  }
}

export function userError(message) {
  return {
    type: USER_FAILURE,
    isFetching: false,
    message
  }
}

/* ASYNC actions using thunk below */

let callbackURL = 'http://localhost:3000/'
if (process.env.NODE_ENV === 'production') {
  callbackURL = 'https://showspark.herokuapp.com'
}

export function signUpUser(user) {
  return (dispatch) => {
    dispatch(requestSignup())

    auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      sso: false,
      callbackURL,
      email: user.email,
      password: user.password
    }, (err) => {
      if (err) dispatch(signupError(err.message))
      else dispatch(receiveSignup())
    })
  }
}

export function logInUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin())

    auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      sso: false,
      callbackURL,
      email: creds.email,
      password: creds.password
    }, (err) => {
      if (err) dispatch(loginError(err.message))
      else dispatch(receiveLogin())
    })
  }
}

export function logInUserGoogle() {
  return dispatch => auth0.login({
    connection: 'google-oauth2'
  }, (err) => {
    if (err) dispatch(loginError(err.message))
    else dispatch(receiveLogin())
  })
}

export function logInUserFacebook() {
  return dispatch => auth0.login({
    connection: 'facebook-oauth2'
  }, (err) => {
    if (err) dispatch(loginError(err.message))
  })
}


export function handleLoginHash(hash) {
  return (dispatch) => {
    auth0.parseHash(hash, (err, user) => {
      if (err) {
        dispatch(userError(err.message))
      } else {
        dispatch(receiveUser(user))
      }
    })
    dispatch(requestUser())
    dispatch(receiveLogin())
  }
}

export function logOutUser() {
  return (dispatch) => {
    dispatch(requestLogout())
    auth0.logout()
    dispatch(receiveLogout())
  }
}
