import { geocodeByAddress } from 'react-places-autocomplete'
import API from '../utils/API'

export function locationSelected(locationText, locationCoords) {
  return {
    type: 'LOCATION_SELECTED',
    locationText,
    locationCoords
  }
}

// action to change state to isFetching
export function requestVenues() {
  return {
    type: 'REQUEST_VENUES'
  }
}

// action to load venues to state
export function receiveVenues(venues) {
  return {
    type: 'RECEIVE_VENUES',
    venues
  }
}

/* ASYNC FUNCTIONS GO BELOW OTHERS HERE */

// use thunk to aync fetch venues and trigger both venues actions above
export function fetchVenues(city, state, country) {
  return (dispatch) => {
    dispatch(requestVenues())

    API.get('venues', { city, state, country }, (res) => {
      dispatch(receiveVenues(res))
    })
  }
}

// set location state and start fetching venues
// called from this.props.locationSelected function in child component
export function locationSelectedAndRequestVenues(locationText) {
  return (dispatch) => {
    const locationArray = locationText.split(',')
    const city = locationArray[0]
    const state = locationArray[1]
    const country = locationArray[2]

    // just send the text to state first
    dispatch(locationSelected(locationText, null))

    // then async geocode and send text and coords
    geocodeByAddress(locationText, (err, res) => { // eslint-disable-line
      if (err) throw err // TODO: handle error in browser
      const locationCoords = [res.lng, res.lat]
      dispatch(locationSelected(locationText, locationCoords))
    })

    // then async fetch venues
    dispatch(fetchVenues(city, state, country))
  }
}
