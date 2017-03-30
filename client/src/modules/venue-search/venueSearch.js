import { geocodeByAddress } from 'react-places-autocomplete'

import API from '../../utils/API'
import { initialState } from '../../store'

/* ACTION TYPES */

export const REGION_SET = 'venue-search/REGION_SET'
export const REGION_ERROR = 'venue-search/REGION_ERROR'
export const REQUEST_VENUES = 'venue-search/REQUEST_VENUES'
export const RECEIVE_VENUES = 'venue-search/RECEIVE_VENUES'
export const REQUEST_VENUES_ERROR = 'venue-search/REQUEST_VENUES_ERROR'
export const LIST_CARD_HOVER = 'venue-search/LIST_CARD_HOVER'
export const LIST_PAGE_SELECTED = 'venue-search/LIST_PAGE_SELECTED'
export const VENUE_SELECTED = 'venue-search/VENUE_SELECTED'

/* REDUCERS */

export default function reducer(state = initialState.venueSearch, action) {
  switch (action.type) {
    case REGION_SET:
      return {
        ...state,
        region: {
          ...state.region,
          text: action.regionText,
          coords: action.regionCoords,
          errorMessage: null
        }
      }
    case REGION_ERROR:
      return {
        ...state,
        region: {
          ...state.region,
          errorMessage: action.message
        }
      }
    case REQUEST_VENUES:
      return {
        ...state,
        venues: {
          ...state.venues,
          isFetching: true,
          errorMessage: null
        }
      }
    case REQUEST_VENUES_ERROR:
      return {
        ...state,
        venues: {
          ...state.venues,
          isFetching: false,
          errorMessage: action.message,
          data: [],
          pageCount: 0,
          total: 0
        }
      }
    case RECEIVE_VENUES:
      return {
        ...state,
        venues: {
          ...state.venues,
          data: action.data,
          pageCount: action.pages,
          total: action.total,
          errorMessage: null,
          isFetching: false
        }
      }
    case LIST_CARD_HOVER:
      return {
        ...state,
        venues: {
          ...state.venues,
          hoveredId: action.venueId
        }
      }
    case LIST_PAGE_SELECTED:
      return {
        ...state,
        venues: {
          ...state.venues,
          currentPage: action.currentPage
        }
      }
    case VENUE_SELECTED:
      return {
        ...state,
        venue: {
          ...initialState.venue,
          ...action.venue
        }
      }
    default:
      return state
  }
}

/* ACTION CREATORS */

export function regionSet(regionText, regionCoords) {
  return {
    type: REGION_SET,
    regionText,
    regionCoords
  }
}

export function regionError() {
  return {
    type: REGION_ERROR,
    message: 'That\'s not a real region, try again!'
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
    type: RECEIVE_VENUES,
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

export function venueSelected(venue) {
  return {
    type: VENUE_SELECTED,
    venue
  }
}

/* ASYNC ACTION CREATORS */

export function fetchVenues(regionText, limit, offset) {
  return (dispatch) => { // eslint-disable-line consistent-return
    const regionArray = regionText.split(',')

    if (regionArray.length === 3) {
      const city = regionArray[0].trim()
      const state = regionArray[1].trim()
      const country = regionArray[2].trim()

      dispatch(requestVenues())

      API.get('venues', { city, state, country, limit, offset }, (res) => {
        if (res.data.length > 0) {
          return dispatch(receiveVenues(res.data, res.pages, res.total))
        }
        return dispatch(requestVenuesError())
      })
    } else {
      return dispatch(requestVenuesError())
    }
  }
}

export function regionSelected(regionText) {
  return (dispatch) => {
    // just send the text to state first for input
    dispatch(regionSet(regionText, null))

    // async geocode and send text and coords
    geocodeByAddress(regionText, (err, res) => {
      if (err) return dispatch(regionError())
      const regionCoords = [res.lng, res.lat]
      return dispatch(regionSet(regionText, regionCoords))
    })
  }
}
