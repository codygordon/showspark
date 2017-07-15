import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import AppContainer from './modules/app/AppContainer'

/* NOTE: if semantic-ui-css is updated, remember to delete the lines that
   change the non-Semantic component styles like fonts, etc. */
import '../node_modules/semantic-ui-css/semantic.css'
import './styles/main.css'

render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.querySelector('#root')
)
