import { geocodeByAddress } from 'react-places-autocomplete'

import apiCall from '../../utils/api-call'
import { initialState } from '../../store'

/* ACTION TYPES */

export const RECEIVE_CITY_TEXT = 'venue-search/RECEIVE_CITY_TEXT'
export const RECEIVE_CITY_COORDS = 'venue-search/RECEIVE_CITY_COORDS'
export const CITY_ERROR = 'venue-search/CITY_ERROR'
export const REQUEST_VENUES = 'venue-search/REQUEST_VENUES'
export const RECEIVE_VENUES = 'venue-search/RECEIVE_VENUES'
export const REQUEST_VENUES_ERROR = 'venue-search/REQUEST_VENUES_ERROR'
export const LIST_CARD_HOVER = 'venue-search/LIST_CARD_HOVER'
export const LIST_PAGE_SELECTED = 'venue-search/LIST_PAGE_SELECTED'

/* REDUCERS */

export default function reducer(state = initialState.venueSearch, action) {
  switch (action.type) {
    case RECEIVE_CITY_TEXT:
      return {
        ...state,
        city: {
          ...state.city,
          errorMessage: null,
          text: action.cityText
        }
      }
    case RECEIVE_CITY_COORDS:
      return {
        ...state,
        city: {
          ...state.city,
          errorMessage: null,
          coords: action.cityCoords
        }
      }
    case CITY_ERROR:
      return {
        ...state,
        city: {
          ...state.city,
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
          isFetching: false,
          errorMessage: null,
          data: action.data,
          pageCount: action.pages,
          total: action.total
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
    default:
      return state
  }
}

/* ACTION CREATORS */

export function receiveCityText(cityText) {
  return {
    type: RECEIVE_CITY_TEXT,
    cityText
  }
}

export function receiveCityCoords(cityCoords) {
  return {
    type: RECEIVE_CITY_COORDS,
    cityCoords
  }
}

export function cityError() {
  return {
    type: CITY_ERROR,
    message: 'That\'s not a real place, try again!'
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
    currentPage: parseInt(pageNum, 10)
  }
}

/* ASYNC ACTION CREATORS */

export function fetchVenues(cityCoords) {
  return (dispatch) => {
    dispatch(requestVenues())
    apiCall({
      dataType: 'venues-proximity',
      latitude: cityCoords.lat,
      longitude: cityCoords.lng
    }, (res, err) => {
      if (res.data.length > 0) return dispatch(receiveVenues(res.data))
      return dispatch(requestVenuesError(err))
    })
  }
}

export function citySelected(citySlug) {
  return async (dispatch) => {
    const cityText = citySlug.replace(/-/g, ' ')
    try {
      const geocoded = await geocodeByAddress(cityText)
      const coords = {
        latitude: geocoded[0].geometry.location.lat(),
        longitude: geocoded[0].geometry.location.lng()
      }
      dispatch(receiveCityCoords(coords))
    } catch (err) { dispatch(cityError(err)) }
  }
}
