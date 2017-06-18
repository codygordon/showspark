import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import { Dimmer, Loader } from 'semantic-ui-react'
import VenueList from './components/VenueList'
import VenueMap from './components/VenueMap'

import * as actions from './actions'

class VenueSearch extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    city: PropTypes.object.isRequired,
    venues: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location, history, city } = this.props
    if (location.search) {
      const query = qs.parse(location.search)
      if (query.city && !query.page) history.replace(`${location.pathname}${location.search}&page=1`)
      if (!city.text && query.city) dispatch(actions.citySelected(query.city))
    } else history.push('/')
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = this.props
    if (nextProps.location.search && location.search) {
      const thisQuery = qs.parse(location.search)
      const nextQuery = qs.parse(nextProps.location.search)
      if (thisQuery.city !== nextQuery.city) dispatch(actions.citySelected(nextQuery.city))
      if (thisQuery.page !== nextQuery.page) dispatch(actions.listPageSelected(nextQuery.page))
    }
  }

  handleVenueCardHover = (venueId) => {
    const { dispatch } = this.props
    dispatch(actions.listCardHover(venueId))
  }

  handleVenueCardClick = (venue) => {
    const { dispatch } = this.props
    // TODO: set card to active
  }

  handleMapPopupClick = (venueId) => {
    const { dispatch } = this.props
    // TODO: set card to active
  }

  render() {
    const { location, history, auth, city, venues } = this.props

    return (
      <section className="venue-search-container">
        <Dimmer active={venues.isFetching}>
          <Loader size="large">Loading Venues...</Loader>
        </Dimmer>

        <VenueMap
          // isAuthenticated={auth.isAuthenticated}
          city={city}
          venues={venues}
          handlePopupClick={this.handleMapPopupClick} />

        <VenueList
          // isAuthenticated={auth.isAuthenticated}
          location={location}
          history={history}
          city={city}
          venues={venues}
          handleCardHover={this.handleVenueCardHover}
          handleCardClick={this.handleVenueCardClick} />
      </section>
    )
  }
}

const VenueSearchContainer = connect()(VenueSearch)

export default VenueSearchContainer
