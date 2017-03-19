import initialState from './initialState'

function venues(state = initialState.venues, action) {
  switch (action.type) {
    case 'REQUEST_VENUES':
      return { ...state,
        isFetching: true
      }
    case 'RECEIVE_VENUES':
      return { ...state,
        isFetching: false,
        data: action.venues,
        errorMessage: null
      }
    case 'VENUES_ERROR':
      return { ...state,
        isFetching: false,
        errorMessage: action.message
      }
    default:
      return state
  }
}

export default venues
