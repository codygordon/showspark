import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'

/* import reducers from modules */
import venueSearch from './modules/venue-search/venueSearch'

/* import initial states from modules */
import venueSearchInitState from './modules/venue-search/initialState'

const rootReducer = combineReducers({
  venueSearch,
  router: routerReducer
})

export const history = createBrowserHistory()

const middleware = [routerMiddleware(history), thunk]

const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export const store = createStore(rootReducer, {
  venueSearch: venueSearchInitState
}, enhancers)
