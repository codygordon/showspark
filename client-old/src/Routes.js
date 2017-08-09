import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BroswerRouter, Switch, Route } from 'react-router-dom'

import AppContainer from './modules/app/AppContainer'
import HomeContainer from './modules/home/HomeContainer'
import ArtistContainer from './modules/artist/ArtistContainer'
// import Admin from './modules/artist/Admin'
// import VenueSearch from './modules/venue-search/VenueSearch'
import NotFound from './modules/app/components/NotFound'
import LoginInterstitial from './modules/app/components/LoginInterstitial'

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
        city={this.props.venueSearch.city} />
    </AppContainer>
  )

  ArtistPlusProps = ({ location }) => (
    <AppContainer
      location={location}
      history={history}
      auth={this.props.auth}
      showHeader>
      <ArtistContainer
        location={location}
        history={history}
        isAuthenticated={this.props.auth.isAuthenticated}
        artist={this.props.artist} />
    </AppContainer>
  )

  // VenueSearchPlusProps = ({ location }) => (
  //   <App
  //     location={location}
  //     history={history}
  //     auth={this.props.auth}
  //     errorMessage={this.props.venueSearch.city.errorMessage || this.props.venueSearch.venues.errorMessage}
  //     showHeader>
  //     <VenueSearch
  //       location={location}
  //       history={history}
  //       isAuthenticated={this.props.auth.isAuthenticated}
  //       city={this.props.venueSearch.city}
  //       venues={this.props.venueSearch.venues}
  //       artist={this.props.artist} />
  //   </App>
  // )

  // LoginPlusProps = ({ location }) => (
  //   <AppContainer
  //     location={location}
  //     history={history}
  //     auth={this.props.auth}
  //     errorMessage={this.props.auth.errorMessage}
  //     showHeader>
  //     <Login />
  //   </AppContainer>
  // )

  // AdminPlusProps = ({ location }) => (
  //   <App
  //     location={location}
  //     history={history}
  //     auth={this.props.auth}
  //     showHeader
  //     showFooter>
  //     <Admin />
  //   </App>
  // )

  render() {
    return (
      <BroswerRouter>
        <Switch>
          <Route exact match path="/" render={HomeContainer} />
          <Route path="/artist" render={ArtistContainer} />
          {/* <Route path="/venue-search" render={this.VenueSearchPlusProps} /> */}
          <Route path="/login" render={LoginInterstitial} />
          <Route component={NotFound} />
        </Switch>
      </BroswerRouter>
    )
  }
}
