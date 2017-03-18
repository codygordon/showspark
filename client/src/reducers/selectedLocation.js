import initialState from './initialState'

function selectedLocation(state = initialState.selectedLocation, action) {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      return { ...state,
        text: action.locationText,
        coords: action.locationCoords
      }
    default:
      return state
  }
}

export default selectedLocation
