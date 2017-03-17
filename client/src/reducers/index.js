import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import venues from './venues'
import selectedLocation from './selectedLocation'

const rootReducer = combineReducers({
  selectedLocation,
  venues,
  router: routerReducer,
})

export default rootReducer
