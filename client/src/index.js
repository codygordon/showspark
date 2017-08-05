import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

/* NOTE: if semantic-ui-css is updated, remember to delete the lines that
   change the non-Semantic component styles like fonts, etc. */
import 'semantic-ui-css/semantic.css'
import './styles/main.css'

import AppContainer from './modules/app/AppContainer'

render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.querySelector('#root')
)
