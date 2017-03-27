import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { history } from './store'

import Home from './modules/home/container/Home'
import VenueSearch from './modules/venue-search/container/VenueSearch'

const NotFound = () => (
  <div className="not-found">
    <h2>404 — Sorry, didn&#39;t find anything here...</h2>
  </div>
)

export default class App extends Component {
  static PropTypes = {

  }

  HomePlusProps = ({ location }) => (
    <Home
      history={history}
      location={location}
    />
  )

  VenueSearchPlusProps = ({ location }) => (
    <VenueSearch
      history={history}
      location={location}
      map={this.props.venueSearch.map}
      selectedLocation={this.props.venueSearch.selectedLocation}
      venues={this.props.venueSearch.venues}
      locationSelected={this.props.locationSelected}
      locationSelectedAndRequestVenues={this.props.locationSelectedAndRequestVenues}
      pageSelectedAndRequestVenues={this.props.pageSelectedAndRequestVenues}
      listCardHover={this.props.listCardHover}
    />
  )

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={this.HomePlusProps} />
          <Route path="/venue-search" render={this.VenueSearchPlusProps} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
