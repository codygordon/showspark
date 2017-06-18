import { initialState } from '../../store'
import AuthService from '../../utils/auth-service'

const auth0 = new AuthService()

/* ACTION TYPES */

export const SHOW_AUTH_TOGGLE = 'auth/SHOW_LOG_IN_TOGGLE'
export const SHOW_SIGN_UP_TOGGLE = 'auth/SHOW_SIGN_UP_TOGGLE'
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
    case SHOW_AUTH_TOGGLE:
      return {
        ...state,
        showingAuth: !state.showingAuth,
        showingSignUp: false
      }
    case SHOW_SIGN_UP_TOGGLE:
      return {
        ...state,
        showingSignUp: !state.showingSignUp
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
        errorMessage: null
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

export function showAuthToggle() {
  return {
    type: SHOW_AUTH_TOGGLE
  }
}

export function showSignUpToggle() {
  return {
    type: SHOW_SIGN_UP_TOGGLE
  }
}

export function requestSignup() {
  return {
    type: SIGNUP_REQUEST
  }
}

export function receiveSignup() {
  return {
    type: SIGNUP_SUCCESS
  }
}

export function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    message
  }
}

export function requestLogin() {
  return {
    type: LOGIN_REQUEST
  }
}

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function requestUser() {
  return {
    type: USER_REQUEST
  }
}

export function receiveUser(user) {
  return {
    type: USER_SUCCESS,
    user
  }
}

export function userError(message) {
  return {
    type: USER_FAILURE,
    message
  }
}

/* ASYNC actions using thunk below */

export function signUpUser(user) {
  return (dispatch) => {
    dispatch(requestSignup())

    auth0.signup(user.email, user.password, (err) => {
      if (err) dispatch(signupError(err.message))
      else dispatch(receiveSignup())
    })
  }
}

export function logInUser(user, uri) {
  return (dispatch) => {
    dispatch(requestLogin())

    auth0.login(user.email, user.password, uri, (err) => {
      if (err) dispatch(loginError(err.message))
      else dispatch(receiveLogin())
    })
  }
}

export function logInUserGoogle() {
  return dispatch => auth0.loginWithGoogle((err) => {
    if (err) dispatch(loginError(err.message))
    else dispatch(receiveLogin())
  })
}

export function logInUserFacebook() {
  return dispatch => auth0.loginWithFacebook((err) => {
    if (err) dispatch(loginError(err.message))
    else dispatch(receiveLogin())
  })
}


export function handleLoginHash(hash) {
  return (dispatch) => {
    dispatch(requestUser())
    auth0.parseHash(hash, (err, user) => {
      if (err) {
        dispatch(userError(err.message))
      } else {
        dispatch(receiveUser(user))
      }
    })
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
