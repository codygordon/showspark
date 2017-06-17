import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import { Dimmer, Loader } from 'semantic-ui-react'
import VenuesList from './components/VenuesList'
import Map from './components/Map'

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
    const { dispatch, location, history } = this.props
    if (location.search) {
      const query = qs.parse(location.search)
      if (query.city && query.page) {
        dispatch(actions.citySelected(query.city))
        dispatch(actions.fetchVenues(query.city))
        dispatch(actions.listPageSelected(query.page))
      } else if (query.city && !query.page) {
        history.replace(`${location.pathnname}${location.search}&page=1`)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = this.props
    if (nextProps.location.search && location.search) {
      const thisQuery = qs.parse(location.search)
      const nextQuery = qs.parse(nextProps.location.search)
      if (nextQuery.city && thisQuery.city
      && nextQuery.page && thisQuery.page) {
        if (thisQuery.city !== nextQuery.city) {
          dispatch(actions.citySelected(nextQuery.city))
          dispatch(actions.listPageSelected(nextQuery.page))
        } else if (thisQuery.page !== nextQuery.page) {
          dispatch(actions.listPageSelected(nextQuery.page))
        }
      }
    }
  }

  render() {
    const { auth, city, venues } = this.props
    const errorMessage = city.errorMessage ? city.errorMessage : venues.errorMessage

    return (
      <section className="venue-search-container">
        <Dimmer active={venues.isFetching}>
          <Loader size="large">Loading Venues...</Loader>
        </Dimmer>

        <Map
          isAuthenticated={auth.isAuthenticated}
          city={city}
          venues={venues} />

        <VenuesList
          isAuthenticated={auth.isAuthenticated}
          city={city}
          venues={venues} />

        <Dimmer active={!!errorMessage}>
          <h2 className="dimmer-error">{errorMessage}</h2>
        </Dimmer>
      </section>
    )
  }
}

const VenueSearchContainer = connect()(VenueSearch)

export default VenueSearchContainer
