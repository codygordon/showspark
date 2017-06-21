import { initialState } from '../../store'
import apiCall from '../../utils/api-call'

/* ACTION TYPES */

export const REQUEST_FB_TOKEN = 'artist/REQUEST_FB_TOKEN'
export const RECEIVE_FB_TOKEN = 'artist/RECEIVE_FB_TOKEN'
export const FB_TOKEN_ERROR = 'artist/FB_TOKEN_ERROR'

/* REDUCERS */

export default function reducer(state = initialState.artist, action) {
  switch (action.type) {
    case REQUEST_FB_TOKEN:
      return {
        ...state,
        fetchingFbToken: true
      }
    case RECEIVE_FB_TOKEN:
      return {
        ...state,
        fetchingFbToken: false,
        fbToken: action.fbToken
      }
    case FB_TOKEN_ERROR:
      return {
        ...state,
        fetchingFbToken: false,
        fbToken: action.message
      }
    default:
      return state
  }
}

  /* ACTION CREATORS */
export function requestFbToken() {
  return {
    type: REQUEST_FB_TOKEN
  }
}

export function receiveFbToken(fbToken) {
  return {
    type: RECEIVE_FB_TOKEN,
    fbToken
  }
}

export function fbTokenError(message) {
  return {
    type: FB_TOKEN_ERROR,
    message
  }
}

  /* ASYNC ACTION CREATORS */

export function fetchFbToken() {
  return async (dispatch) => {
    dispatch(requestFbToken())
    try {
      const fb = await apiCall({ dataType: 'fb-token' })
      dispatch(receiveFbToken(fb.token))
    } catch (err) { dispatch(fbTokenError(err.message)) }
  }
}
