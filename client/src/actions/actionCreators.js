import API from '../utils/API'

export function locationSelected(location) {
  return {
    type: 'LOCATION_SELECTED',
    location
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
export function locationSelectedAndRequestVenues(location) {
  return (dispatch) => {
    const locationArray = location.split(',')
    const city = locationArray[0]
    const state = locationArray[1]
    const country = locationArray[2]

    dispatch(locationSelected(location))
    dispatch(fetchVenues(city, state, country))
  }
}
