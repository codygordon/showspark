import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import HomeContainer from '../../home/HomeContainer'
import ArtistContainer from '../../artist/ArtistContainer'
import LoginInterstitial from './LoginInterstitial'
import NotFound from './NotFound'

const Routes = () => (
  <Switch>
    <Route exact match path="/" render={HomeContainer} />
    <Route path="/artist" render={ArtistContainer} />
    <Route path="/login" render={LoginInterstitial} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
