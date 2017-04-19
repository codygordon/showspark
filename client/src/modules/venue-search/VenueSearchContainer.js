import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import './venue-search.css'

import { regionSelected, listPageSelected, fetchVenues } from './venueSearch'

import VenuesHeader from '../shared-components/VenuesHeader'
import List from './components/List'
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
      const query = queryString.parse(location.search)
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
      const thisQuery = queryString.parse(location.search)
      const nextQuery = queryString.parse(nextProps.location.search)
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
    const { dispatch, history, auth, map, region, venues } = this.props
    const errorMessage = region.errorMessage ? region.errorMessage : venues.errorMessage

    return (
      <div className="venue-search">
        <VenuesHeader
          dispatch={dispatch}
          history={history}
          auth={auth}
          region={region}
        />

        <Dimmer active={venues.isFetching}>
          <Loader size="large">
            Loading Venues...
          </Loader>
        </Dimmer>

        <Map
          dispatch={dispatch}
          map={map}
          region={region}
          venues={venues}
        />

        <List
          dispatch={dispatch}
          history={history}
          region={region}
          venues={venues}
        />

        <Dimmer active={!!errorMessage}>
          <h2 className="dimmer-error">{errorMessage}</h2>
        </Dimmer>
      </div>
    )
  }
}

const VenueSearchContainer = connect()(VenueSearch)

export default VenueSearchContainer
