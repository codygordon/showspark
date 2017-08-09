import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import HomeContainer from './modules/home/HomeContainer'
import AuthContainer from './modules/auth/AuthContainer'
import OnboardingContainer from './modules/onboarding/OnboardingContainer'
import NotFound from './modules/app/components/NotFound'

import registerServiceWorker from './utils/register-service-worker'

import auth from './modules/auth/reducer'
import home from './modules/home/reducer'
import onboarding from './modules/onboarding/reducer'

import './styles/main.css'

const history = createHistory()

const store = createStore(
  combineReducers({
    auth,
    home,
    onboarding,
    router: routerReducer
  }),
  applyMiddleware(thunk, routerMiddleware(history), logger)
)

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={AuthContainer} />
        <Route path="/onboarding" component={OnboardingContainer} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

registerServiceWorker()
