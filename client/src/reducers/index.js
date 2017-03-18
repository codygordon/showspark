import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import selectedLocation from './selectedLocation'
import venues from './venues'
import map from './map'

const rootReducer = combineReducers({
  selectedLocation,
  venues,
  map,
  router: routerReducer,
})

export default rootReducer
