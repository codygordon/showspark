import initialState from './initialState'

function selectedLocation(state = initialState.selectedLocation, action) {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      return { ...state,
        text: action.locationText,
        coords: action.locationCoords,
        errorMessage: null
      }
    case 'LOCATION_ERROR':
      return { ...state,
        errorMessage: action.message
      }
    default:
      return state
  }
}

export default selectedLocation
