import initialState from './initialState'

function map(state = initialState.map, action) {
  switch (action.type) {
    case 'MAP_ZOOM_CHANGE':
      return { ...state,
        zoom: action.location
      }
    case 'MAP_CENTER_CHANGE':
      return { ...state,
        center: action.center
      }
    default:
      return state
  }
}

export default map
