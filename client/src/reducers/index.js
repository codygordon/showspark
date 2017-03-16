import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import map from './map'

const rootReducer = combineReducers({
  map,
  router: routerReducer,
})

export default rootReducer
