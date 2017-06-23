import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'

import { store } from './store'

import Routes from './Routes'

import '../node_modules/semantic-ui-popup/popup.min.css'
import '../node_modules/semantic-ui-dimmer/dimmer.min.css'
import '../node_modules/semantic-ui-loader/loader.min.css'
import './styles/main.css'

function mapStateToProps(state) {
  return {
    auth: state.auth,
    venueSearch: state.venueSearch,
    venue: state.venue,
    artist: state.artist
  }
}

const Root = connect(mapStateToProps)(Routes)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#root')
)
