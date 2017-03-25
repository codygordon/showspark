import { geocodeByAddress } from 'react-places-autocomplete'
import API from '../utils/API'

export function locationSelected(locationText, locationCoords) {
  return {
    type: 'LOCATION_SELECTED',
    locationText,
    locationCoords
  }
}

export function locationError() {
  return {
    type: 'LOCATION_ERROR',
    message: 'That\'s not a real location, try again!'
  }
}

// action to change state to isFetching
export function requestVenues() {
  return {
    type: 'REQUEST_VENUES'
  }
}

// action to load venues to state
export function receiveVenues(data, pages, total) {
  return {
    type: 'RECEIVE_VENUES',
    data,
    pages,
    total
  }
}

export function venuesError(city, state) {
  return {
    type: 'VENUES_ERROR',
    message: `Sorry, there aren't any venues in ${city}, ${state}. Try a different city!`
  }
}

export function venueListCardHover(venueId) {
  return {
    type: 'VENUE_LIST_CARD_HOVER',
    venueId
  }
}

export function venuePageSelected(pageNum) {
  return {
    type: 'VENUE_PAGE_SELECTED',
    currentPage: pageNum
  }
}

/* ASYNC FUNCTIONS GO BELOW OTHERS HERE */

// use thunk to aync fetch venues and trigger both venues actions above
export function fetchVenues(locationText, limit, offset) {
  return (dispatch) => {
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
        return dispatch(venuesError(city, state, country))
      })
    } else {
      return dispatch(venuesError())
    }
  }
}

export function locationSelectedAndRequestVenues(locationText, limit, offset, pageNum) {
  return (dispatch) => {
    // just send the text to state first for input
    dispatch(locationSelected(locationText, null))

    // then set the page number state
    dispatch(venuePageSelected(parseInt(pageNum)))

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
    dispatch(venuePageSelected(parseInt(pageNum)))

    // async fetch venues
    dispatch(fetchVenues(locationText, limit, offset))
  }
}
