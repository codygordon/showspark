function selectedLocation(state = {
  location: null
}, action) {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      return { ...state,
        location: action.location
      }
    default:
      return state
  }
}

export default selectedLocation
