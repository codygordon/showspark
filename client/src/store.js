import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'

/* import reducers from modules */
import venueSearch from './modules/venue-search/venueSearch'
import venue from './modules/venue/venue'

export const history = createBrowserHistory()

export const initialState = {
  venueSearch: {
    map: {
      center: [-74, 40.7],
      zoom: [11.5],
      errorMessage: null
    },
    region: {
      text: '',
      coords: null,
      errorMessage: null
    },
    venues: {
      isFetching: false,
      data: [],
      perPage: 16,
      pageCount: 0,
      currentPage: 1,
      total: 0,
      errorMessage: null,
      hoveredId: null
    }
  },
  venue: {
    isFetching: false,
    errorMessage: null
  },
  artist: {
    isFetching: false,
    errorMessage: null
  }
}

const rootReducer = combineReducers({
  venueSearch,
  venue,
  router: routerReducer
})

const middleware = [routerMiddleware(history), thunk]

const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export const store = createStore(rootReducer, {
  venueSearch: initialState.venueSearch
}, enhancers)
