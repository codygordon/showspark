import {
  auth0,
  AUTH_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  LOG_OUT_SUCCESS
} from './actions'

const initialState = {
  isFetching: false,
  isAuthenticated: auth0.loggedIn(),
  userProfile: auth0.getUserProfile(),
  errorMessage: '',
  alertMessage: '',
  showingLogin: false
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userProfile: action.userProfile,
        isFetching: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isFetching: false
      }
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        alertMessage: action.alertMessage,
        isFetching: false
      }
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isFetching: false
      }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}
