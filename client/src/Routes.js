import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import AppContainer from './modules/app/AppContainer'
import HomeContainer from './modules/home/HomeContainer'
import ArtistContainer from './modules/artist/ArtistContainer'
import VenueSearchContainer from './modules/venue-search/VenueSearchContainer'
import NotFound from './modules/app/components/NotFound'

import { history } from './store'

export default class Routes extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    artist: PropTypes.object.isRequired,
    venueSearch: PropTypes.object.isRequired
  }

  HomePlusProps = ({ location }) => (
    <AppContainer
      location={location}
      history={history}
      auth={this.props.auth}
      showHeader
      showFooter>
      <HomeContainer
        location={location}
        history={history}
        venueSearch={this.props.venueSearch} />
    </AppContainer>
  )

  ArtistPlusProps = ({ location }) => (
    <AppContainer
      location={location}
      history={history}
      auth={this.props.auth}
      errorMessage={this.props.artist.errorMessage}
      showHeader>
      <ArtistContainer
        location={location}
        history={history}
        isAuthenticated={this.props.auth.isAuthenticated}
        artist={this.props.artist} />
    </AppContainer>
  )

  VenueSearchPlusProps = ({ location }) => (
    <AppContainer
      location={location}
      history={history}
      auth={this.props.auth}
      errorMessage={this.props.venueSearch.errorMessage}
      showHeader>
      <VenueSearchContainer
        location={location}
        history={history}
        isAuthenticated={this.props.auth.isAuthenticated}
        venueSearch={this.props.venueSearch}
        artist={this.props.artist} />
    </AppContainer>
  )

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact match path="/" render={this.HomePlusProps} />
          <Route path="/artist" render={this.ArtistPlusProps} />
          <Route path="/venue-search" render={this.VenueSearchPlusProps} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
