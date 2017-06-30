import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './modules/app/App'
import Home from './modules/home/Home'
import Artist from './modules/artist/Artist'
// import Admin from './modules/artist/Admin'
// import VenueSearch from './modules/venue-search/VenueSearch'
import NotFound from './modules/app/components/NotFound'
import Login from './modules/app/components/Login'

import { history } from './store'

export default class Routes extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    artist: PropTypes.object.isRequired,
    venueSearch: PropTypes.object.isRequired
  }

  HomePlusProps = ({ location }) => (
    <App
      location={location}
      history={history}
      auth={this.props.auth}
      showHeader
      showFooter>
      <Home
        location={location}
        history={history}
        city={this.props.venueSearch.city} />
    </App>
  )

  ArtistPlusProps = ({ location }) => (
    <App
      location={location}
      history={history}
      auth={this.props.auth}
      showHeader>
      <Artist
        location={location}
        history={history}
        isAuthenticated={this.props.auth.isAuthenticated}
        artist={this.props.artist} />
    </App>
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

  LoginPlusProps = ({ location }) => (
    <App
      location={location}
      history={history}
      auth={this.props.auth}
      errorMessage={this.props.auth.errorMessage}
      showHeader>
      <Login />
    </App>
  )

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
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact match path="/" render={this.HomePlusProps} />
          <Route path="/artist" render={this.ArtistPlusProps} />
          {/* <Route path="/venue-search" render={this.VenueSearchPlusProps} /> */}
          <Route path="/login" render={this.LoginPlusProps} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
