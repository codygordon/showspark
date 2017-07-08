import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import AppContainer from './modules/app/AppContainer'

import '../node_modules/semantic-ui-dropdown/dropdown.min.css'
import '../node_modules/semantic-ui-popup/popup.min.css'
import '../node_modules/semantic-ui-dimmer/dimmer.min.css'
import '../node_modules/semantic-ui-loader/loader.min.css'
import './styles/main.css'

render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.querySelector('#root')
)
