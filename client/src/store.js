import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'

import rootReducer from './reducers/index'

export const history = createBrowserHistory()

const defaultState = {
  selectedLocation: {
    location: null
  },
  venues: {
    isFetching: false,
    data: []
  }
}

const middleware = [routerMiddleware(history), thunk]

const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export const store = createStore(rootReducer, defaultState, enhancers)
