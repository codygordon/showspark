import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import AppContainer from './modules/app/AppContainer'

import './styles/main.css'

render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.querySelector('#root')
)
