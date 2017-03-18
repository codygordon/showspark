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
        data: action.venues
      }
    default:
      return state
  }
}

export default venues
