import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router'

import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { history, store } from './store'
import * as actionCreators from './actions/actionCreators'

import './css/normalize.css'
import './css/styles.css'
import '../node_modules/semantic-ui-css/semantic.css'

import App from './containers/App'
import NotFound from './components/NotFound'

function mapStateToProps(state) {
  return {
    selectedLocation: state.selectedLocation,
    venues: state.venues
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Root = connect(mapStateToProps, mapDispatchToProps)(App)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
)
