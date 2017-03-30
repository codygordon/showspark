import React from 'react'
import { render } from 'react-dom'

import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import { store } from './store'

import App from './App'

/* import styles */
import './css/semantic-truncated.css'
import './css/normalize.css'
import './css/styles.css'

/* import action creators from modules */
import * as venueSearchActions from './modules/venue-search/venueSearch'
import * as venueActions from './modules/venue/venue'

function mapStateToProps(state) {
  return {
    venueSearch: state.venueSearch,
    venue: state.venue,
    artist: state.artist
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...venueSearchActions,
    ...venueActions
  }, dispatch)
}

const Root = connect(mapStateToProps, mapDispatchToProps)(App)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#root')
)
