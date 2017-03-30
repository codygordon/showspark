import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import Header from '../components/Header'
import List from '../components/List'
import Map from '../components/Map'

export default class VenueSearch extends Component {
  static propTypes = {

  }

  componentWillMount() {
    if (this.props.location.search) {
      const query = queryString.parse(this.props.location.search)
      if (query['region-text'] && query.page) {
        const regionText = query['region-text']
        const pageNum = query.page
        const limit = this.props.venues.perPage
        const offset = (pageNum - 1) * limit
        this.props.regionSelected(regionText)
        this.props.listPageSelected(pageNum)
        this.props.fetchVenues(regionText, limit, offset)
      } else if (query['region-text'] && !query.page) {
        this.props.history.push(`/venue-search?region-text=${query['region-text']}&page=1`)
        // // reload hack since pushing the page # doesn't force remount the component
        // location.reload()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search && this.props.location.search) {
      const lastQuery = queryString.parse(this.props.location.search)
      const nextQuery = queryString.parse(nextProps.location.search)
      if (nextQuery['region-text'] && lastQuery['region-text']
      && nextQuery.page && lastQuery.page) {
        const regionText = nextQuery['region-text']
        const pageNum = nextQuery.page
        const limit = this.props.venues.perPage
        const offset = (pageNum - 1) * limit
        if (lastQuery['region-text'] !== nextQuery['region-text']) {
          this.props.regionSelected(regionText)
          this.props.fetchVenues(regionText, limit, offset)
        } else if (lastQuery.page !== nextQuery.page) {
          this.props.listPageSelected(nextQuery.page)
          this.props.fetchVenues(regionText, limit, offset)
        }
      }
    }
  }

  render() {
    const { history, map, region, venues } = this.props
    const errorMessage = region.errorMessage ? region.errorMessage : venues.errorMessage

    return (
      <div className="venue-search">
        <Header
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
