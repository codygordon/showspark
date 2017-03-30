import API from '../../utils/API'
import { initialState } from '../../store'

/* ACTION TYPES */

export const REQUEST_VENUE = 'venue/REQUEST_VENUE'
export const RECEIVE_VENUE = 'venue/RECEIVE_VENUE'
export const REQUEST_VENUE_ERROR = 'venue/REQUEST_VENUE_ERROR'

/* REDUCERS */

export default function reducer(state = initialState.venue, action) {
  switch (action.type) {
    case REQUEST_VENUE:
      return { ...state,
        venue: { ...state.venue,
          isFetching: true,
          errorMessage: null
        }
      }
    case REQUEST_VENUE_ERROR:
      return { ...state,
        venue: { ...state.venues,
          isFetching: false,
          errorMessage: action.message,
          data: []
        }
      }
    case RECEIVE_VENUE:
      return { ...state,
        venues: { ...state.venue,
          data: action.data
        }
      }
    default:
      return state
  }
}

/* ACTION CREATORS */

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
export function receiveVenue(data) {
  return {
    type: RECEIVE_VENUE,
    data
  }
}

/* ASYNC ACTION CREATORS */

export function fetchVenue(venueId) {
  return (dispatch) => {
    dispatch(requestVenue())

    API.get('venues', { venueId }, (res) => {
      if (res) {
        return dispatch(receiveVenue(res))
      }
      return dispatch(requestVenueError())
    })
  }
}
