import apiCall from '../../utils/api-call'
import { initialState } from '../../store'

/* ACTION TYPES */

export const VENUE_SELECTED = 'venue/VENUE_SELECTED'
export const REQUEST_VENUE = 'venue/REQUEST_VENUE'
export const RECEIVE_VENUE = 'venue/RECEIVE_VENUE'
export const REQUEST_VENUE_ERROR = 'venue/REQUEST_VENUE_ERROR'

/* REDUCERS */

export default function reducer(state = initialState.venue, action) {
  switch (action.type) {
    case VENUE_SELECTED:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        ...action.venue
      }
    case REQUEST_VENUE:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      }
    case REQUEST_VENUE_ERROR:
      return {
        ...initialState.venue,
        isFetching: false,
        errorMessage: action.message
      }
    case RECEIVE_VENUE:
      return {
        ...state,
        isFetching: false,
        ...action.venue
      }
    default:
      return state
  }
}

/* ACTION CREATORS */

export function venueSelected(venue) {
  return {
    type: VENUE_SELECTED,
    venue
  }
}

export function requestVenue() {
  return {
    type: REQUEST_VENUE
  }
}

export function requestVenueError() {
  return {
    type: REQUEST_VENUE_ERROR,
    message: 'There was an error loading this venue, please try again.'
  }
}

// action to load venues to state
export function receiveVenue(venue) {
  return {
    type: RECEIVE_VENUE,
    venue
  }
}

/* ASYNC ACTION CREATORS */

export function fetchVenue(id) {
  return (dispatch) => {
    dispatch(requestVenue())

    apiCall({ dataType: 'venues', id }, (res) => {
      if (res) {
        return dispatch(receiveVenue(res))
      }
      return dispatch(requestVenueError())
    })
  }
}
