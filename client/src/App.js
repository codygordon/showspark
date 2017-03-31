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
      region={this.props.venueSearch.region}
      regionSet={this.props.regionSet}
    />
  )

  VenueSearchPlusProps = ({ location }) => (
    <VenueSearch
      history={history}
      location={location}
      map={this.props.venueSearch.map}
      region={this.props.venueSearch.region}
      venues={this.props.venueSearch.venues}
      regionSet={this.props.regionSet}
      regionSelected={this.props.regionSelected}
      listPageSelected={this.props.listPageSelected}
      fetchVenues={this.props.fetchVenues}
      listCardHover={this.props.listCardHover}
      venueSelected={this.props.venueSelected}
    />
  )

  VenuePlusProps = ({ location }) => (
    <Venue
      history={history}
      location={location}
      venue={this.props.venue}
      fetchVenue={this.props.fetchVenue}
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
