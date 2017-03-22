import initialState from './initialState'

function venues(state = initialState.venues, action) {
  switch (action.type) {
    case 'REQUEST_VENUES':
      return { ...state,
        isFetching: true,
        errorMessage: null
      }
    case 'RECEIVE_VENUES':
      return { ...state,
        isFetching: false,
        data: action.data,
        pageCount: action.pages,
        errorMessage: null
      }
    case 'VENUES_ERROR':
      return { ...state,
        isFetching: false,
        errorMessage: action.message
      }
    case 'VENUE_LIST_CARD_HOVER':
      return { ...state,
        hoveredVenueId: action.venueId
      }
    case 'VENUE_PAGE_SELECTED':
      return { ...state,
        currentPage: action.currentPage
      }
    default:
      return state
  }
}

export default venues
