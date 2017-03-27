import { geocodeByAddress } from 'react-places-autocomplete'

import API from '../../utils/API'
import venueSearchInitState from './initialState'

/* ACTION TYPES */

const LOCATION_SELECTED = 'venue-search/LOCATION_SELECTED'
const LOCATION_ERROR = 'venue-search/LOCATION_ERROR'
const REQUEST_VENUES = 'venue-search/REQUEST_VENUES'
const RECIEVE_VENUES = 'venue-search/RECEIVE_VENUES'
const REQUEST_VENUES_ERROR = 'venue-search/REQUEST_VENUES_ERROR'
const LIST_CARD_HOVER = 'venue-search/LIST_CARD_HOVER'
const LIST_PAGE_SELECTED = 'venue-search/LIST_PAGE_SELECTED'

/* REDUCERS */

export default function reducer(state = venueSearchInitState, action) {
  switch (action.type) {
    case LOCATION_SELECTED:
      return { ...state,
        selectedLocation: { ...state.selectedLocation,
          text: action.locationText,
          coords: action.locationCoords,
          errorMessage: null
        }
      }
    case LOCATION_ERROR:
      return { ...state,
        selectedLocation: { ...state.selectedLocation,
          errorMessage: action.message
        }
      }
    case REQUEST_VENUES:
      return { ...state,
        venues: { ...state.venues,
          isFetching: true,
          errorMessage: null
        }
      }
    case REQUEST_VENUES_ERROR:
      return { ...state,
        venues: { ...state.venues,
          isFetching: false,
          errorMessage: action.message
        }
      }
    case RECIEVE_VENUES:
      return { ...state,
        venues: { ...state.venues,
          isFetching: false,
          data: action.data,
          pageCount: action.pages,
          total: action.total,
          errorMessage: null
        }
      }
    case LIST_CARD_HOVER:
      return { ...state,
        venues: { ...state.venues,
          hoveredId: action.venueId
        }
      }
    case LIST_PAGE_SELECTED:
      return { ...state,
        venues: { ...state.venues,
          currentPage: action.currentPage
        }
      }
    default:
      return state
  }
}

/* ACTION CREATORS */

export function locationSelected(locationText, locationCoords) {
  return {
    type: LOCATION_SELECTED,
    locationText,
    locationCoords
  }
}

export function locationError() {
  return {
    type: LOCATION_ERROR,
    message: 'That\'s not a real location, try again!'
  }
}

// action to change state to isFetching
export function requestVenues() {
  return {
    type: REQUEST_VENUES
  }
}

export function requestVenuesError() {
  return {
    type: REQUEST_VENUES_ERROR,
    message: 'Sorry, didn\'t find any venues there. Try a different search!'
  }
}

// action to load venues to state
export function receiveVenues(data, pages, total) {
  return {
    type: RECIEVE_VENUES,
    data,
    pages,
    total
  }
}

export function listCardHover(venueId) {
  return {
    type: LIST_CARD_HOVER,
    venueId
  }
}

export function listPageSelected(pageNum) {
  return {
    type: LIST_PAGE_SELECTED,
    currentPage: pageNum
  }
}

/* ASYNC ACTION CREATORS */

export function fetchVenues(locationText, limit, offset) {
  return (dispatch) => { // eslint-disable-line consistent-return
    const locationArray = locationText.split(',')

    if (locationArray.length === 3) {
      const city = locationArray[0].trim()
      const state = locationArray[1].trim()
      const country = locationArray[2].trim()

      dispatch(requestVenues())

      API.get('venues', { city, state, country, limit, offset }, (res) => {
        if (res.data.length > 0) {
          return dispatch(receiveVenues(res.data, res.pages, res.total))
        }
        return dispatch(requestVenuesError(city, state, country))
      })
    } else {
      return dispatch(requestVenuesError())
    }
  }
}

export function locationSelectedAndRequestVenues(locationText, limit, offset, pageNum) {
  return (dispatch) => {
    // just send the text to state first for input
    dispatch(locationSelected(locationText, null))

    // then set the page number state
    dispatch(listPageSelected(parseInt(pageNum)))

    // async fetch venues
    dispatch(fetchVenues(locationText, limit, offset))

    // async geocode and send text and coords
    geocodeByAddress(locationText, (err, res) => {
      if (err) return dispatch(locationError())
      const locationCoords = [res.lng, res.lat]
      return dispatch(locationSelected(locationText, locationCoords))
    })
  }
}

export function pageSelectedAndRequestVenues(locationText, limit, offset, pageNum) {
  return (dispatch) => {
    // set the page number state
    dispatch(listPageSelected(parseInt(pageNum)))

    // async fetch venues
    dispatch(fetchVenues(locationText, limit, offset))
  }
}
