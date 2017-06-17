import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'

import AuthService from './utils/auth-service'

/* import reducers from modules */
import auth from './modules/auth/actions'
import venueSearch from './modules/venue-search/actions'
import venue from './modules/venue/actions'

const auth0 = new AuthService()

export const history = createBrowserHistory()

export const initialState = {
  auth: {
    showingAuth: false,
    showingEmailAuthForm: false,
    showingSignUp: false,
    isFetching: false,
    isAuthenticated: auth0.loggedIn(),
    user: localStorage.getItem('user_profile') ? JSON.parse(localStorage.getItem('user_profile')) : null,
    errorMessage: null
  },
  venueSearch: {
    city: {
      text: '',
      coords: null,
      errorMessage: null
    },
    venues: {
      isFetching: false,
      data: [],
      perPage: 20,
      pageCount: 1,
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
  auth,
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
  auth: initialState.auth,
  venueSearch: initialState.venueSearch,
  venue: initialState.venue
  // artist: initialState.artist
}, enhancers)
