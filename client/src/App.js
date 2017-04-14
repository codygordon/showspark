import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { history } from './store'

import NotFound from './modules/shared-components/NotFound'
import Home from './modules/home/container/Home'
import VenueSearch from './modules/venue-search/container/VenueSearch'
import Venue from './modules/venue/container/Venue'

export default class App extends Component {
  static PropTypes = {

  }

  HomePlusProps = ({ location }) => (
    <Home
      history={history}
      location={location}
      auth={this.props.auth}
      region={this.props.venueSearch.region}
    />
  )

  VenueSearchPlusProps = ({ location }) => (
    <VenueSearch
      history={history}
      location={location}
      auth={this.props.auth}
      map={this.props.venueSearch.map}
      region={this.props.venueSearch.region}
      venues={this.props.venueSearch.venues}
    />
  )

  VenuePlusProps = ({ location }) => (
    <Venue
      history={history}
      location={location}
      auth={this.props.auth}
      region={this.props.venueSearch.region}
      venue={this.props.venue}
    />
  )

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={this.HomePlusProps} />
          <Route path="/venue-search" render={this.VenueSearchPlusProps} />
          <Route path="/venue" render={this.VenuePlusProps} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
