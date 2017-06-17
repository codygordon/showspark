import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import qs from 'query-string'

import './venue-search.css'

import * as actions from './actions'

import VenuesList from './components/VenuesList'
import Map from './components/Map'

class VenueSearch extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    region: PropTypes.object.isRequired,
    venues: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location, history, venues } = this.props
    if (location.search) {
      const query = qs.parse(location.search)
      if (query['region-text'] && query.page) {
        const limit = venues.perPage
        const offset = (query.page - 1) * limit
        dispatch(regionSelected(query['region-text']))
        dispatch(listPageSelected(query.page))
        dispatch(fetchVenues(query['region-text'], limit, offset))
      } else if (query['region-text'] && !query.page) {
        history.push(`/venue-search?region-text=${query['region-text']}&page=1`)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location, venues } = this.props
    if (nextProps.location.search && location.search) {
      const thisQuery = qs.parse(location.search)
      const nextQuery = qs.parse(nextProps.location.search)
      if (nextQuery['region-text'] && thisQuery['region-text']
      && nextQuery.page && thisQuery.page) {
        const limit = venues.perPage
        const offset = (nextQuery.page - 1) * limit
        if (thisQuery['region-text'] !== nextQuery['region-text']) {
          dispatch(regionSelected(nextQuery['region-text']))
          dispatch(listPageSelected(nextQuery.page))
          dispatch(fetchVenues(nextQuery['region-text'], limit, offset))
        } else if (thisQuery.page !== nextQuery.page) {
          dispatch(listPageSelected(nextQuery.page))
          dispatch(fetchVenues(nextQuery['region-text'], limit, offset))
        }
      }
    }
  }

  render() {
    const { dispatch, location, history, auth, map, region, venues } = this.props
    const errorMessage = region.errorMessage ? region.errorMessage : venues.errorMessage

    return (
      <section className="venue-search-container">
        <Dimmer active={venues.isFetching}>
          <Loader size="large">
            Loading Venues...
          </Loader>
        </Dimmer>

        <Map
          dispatch={dispatch}
          map={map}
          region={region}
          venues={venues} />

        <VenuesList
          dispatch={dispatch}
          history={history}
          region={region}
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
