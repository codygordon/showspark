import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import '../venue-search.css'

import VenuesHeader from '../../shared-components/VenuesHeader'
import List from '../components/List'
import Map from '../components/Map'

export default class VenueSearch extends Component {
  static propTypes = {

  }

  componentWillMount() {
    if (this.props.location.search) {
      const query = queryString.parse(this.props.location.search)
      if (query['region-text'] && query.page) {
        const limit = this.props.venues.perPage
        const offset = (query.page - 1) * limit
        this.props.regionSelected(query['region-text'])
        this.props.listPageSelected(query.page)
        this.props.fetchVenues(query['region-text'], limit, offset)
      } else if (query['region-text'] && !query.page) {
        this.props.history.push(`/venue-search?region-text=${query['region-text']}&page=1`)
        // // reload hack since pushing the page # doesn't force remount the component
        // location.reload()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search && this.props.location.search) {
      const thisQuery = queryString.parse(this.props.location.search)
      const nextQuery = queryString.parse(nextProps.location.search)
      if (nextQuery['region-text'] && thisQuery['region-text']
      && nextQuery.page && thisQuery.page) {
        const limit = this.props.venues.perPage
        const offset = (nextQuery.page - 1) * limit
        if (thisQuery['region-text'] !== nextQuery['region-text']) {
          this.props.regionSelected(nextQuery['region-text'])
          this.props.listPageSelected(nextQuery.page)
          this.props.fetchVenues(nextQuery['region-text'], limit, offset)
        } else if (thisQuery.page !== nextQuery.page) {
          this.props.listPageSelected(nextQuery.page)
          this.props.fetchVenues(nextQuery['region-text'], limit, offset)
        }
      }
    }
  }

  render() {
    const { history, map, region, venues } = this.props
    const errorMessage = region.errorMessage ? region.errorMessage : venues.errorMessage

    return (
      <div className="venue-search">
        <VenuesHeader
          history={history}
          region={region}
          regionSet={this.props.regionSet}
        />

        <Dimmer active={venues.isFetching}>
          <Loader size="large">
            Loading Venues...
          </Loader>
        </Dimmer>

        <Map
          map={map}
          region={region}
          venues={venues}
        />

        <List
          history={history}
          region={region}
          venues={venues}
          listCardHover={this.props.listCardHover}
          venueSelected={this.props.venueSelected}
        />

        <Dimmer active={!!errorMessage}>
          <h2 className="dimmer-error">{errorMessage}</h2>
        </Dimmer>
      </div>
    )
  }
}
