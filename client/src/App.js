import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { history } from './store'

import NotFound from './modules/shared-components/NotFound'
import HomeContainer from './modules/home/HomeContainer'
import VenueSearchContainer from './modules/venue-search/VenueSearchContainer'
import VenueContainer from './modules/venue/VenueContainer'

export default class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    venueSearch: PropTypes.object.isRequired,
    venue: PropTypes.object.isRequired
  }

  HomePlusProps = ({ location }) => (
    <HomeContainer
      history={history}
      location={location}
      auth={this.props.auth}
      region={this.props.venueSearch.region} />
  )

  VenueSearchPlusProps = ({ location }) => (
    <VenueSearchContainer
      history={history}
      location={location}
      auth={this.props.auth}
      map={this.props.venueSearch.map}
      region={this.props.venueSearch.region}
      venues={this.props.venueSearch.venues} />
  )

  VenuePlusProps = ({ location }) => (
    <VenueContainer
      history={history}
      location={location}
      auth={this.props.auth}
      region={this.props.venueSearch.region}
      venue={this.props.venue} />
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
