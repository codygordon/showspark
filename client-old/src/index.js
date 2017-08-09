import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-loader/loader.min.css'
import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'
import './styles/main.css'

import AppContainer from './modules/app/AppContainer'

render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.querySelector('#root')
)
