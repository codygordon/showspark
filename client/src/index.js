import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'

import { store } from './store'

import App from './App'

import '../node_modules/semantic-ui-css/semantic.min.css'
import './shared-css/normalize.css'
import './shared-css/styles.css'

function mapStateToProps(state) {
  return {
    auth: state.auth,
    venueSearch: state.venueSearch,
    venue: state.venue
    // artist: state.artist
  }
}

const Root = connect(mapStateToProps)(App)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#root')
)
