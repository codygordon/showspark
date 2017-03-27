import React from 'react'
import { render } from 'react-dom'

import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import { store } from './store'

import App from './App'

/* import styles */
import './css/normalize.css'
import './css/styles.css'
// TODO: pull out only what is needed from semantic-ui
import '../node_modules/semantic-ui-css/semantic.css'

/* import action creators from modules */
import * as venueSearchActions from './modules/venue-search/venueSearch'

function mapStateToProps(state) {
  return {
    venueSearch: state.venueSearch
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...venueSearchActions
  }, dispatch)
}

const Root = connect(mapStateToProps, mapDispatchToProps)(App)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#root')
)
