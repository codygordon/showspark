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
      if (query['location-text'] && query.page) {
        const locationText = query['location-text']
        const pageNum = query.page
        const limit = this.props.venues.perPage
        const offset = (pageNum - 1) * limit
        this.props.locationSelectedAndRequestVenues(locationText, limit, offset, pageNum)
      } else if (query['location-text'] && !query.page) {
        this.props.history.push(`?location-text=${query['location-text']}&page=1`)
        // reload hack since pushing the page # doesn't force remount the component
        location.reload()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search && this.props.location.search) {
      const lastQuery = queryString.parse(this.props.location.search)
      const nextQuery = queryString.parse(nextProps.location.search)
      if (nextQuery['location-text'] && lastQuery['location-text']
      && nextQuery.page && lastQuery.page) {
        const locationText = nextQuery['location-text']
        const pageNum = nextQuery.page
        const limit = this.props.venues.perPage
        const offset = (pageNum - 1) * limit
        if (lastQuery['location-text'] !== nextQuery['location-text']) {
          this.props.locationSelectedAndRequestVenues(locationText, limit, offset, pageNum)
        } else if (lastQuery.page !== nextQuery.page) {
          this.props.pageSelectedAndRequestVenues(locationText, limit, offset, pageNum)
        }
      }
    }
  }

  render() {
    let loading;
    const { venues, selectedLocation } = this.props
    const errorMessage = selectedLocation.errorMessage ? selectedLocation.errorMessage : venues.errorMessage

    return (
      <div className="venue-search">
        <Header
          locationSelectedAndRequestVenues={this.props.locationSelectedAndRequestVenues}
          locationSelected={this.props.locationSelected}
          selectedLocation={selectedLocation}
          history={this.props.history}
          venues={venues}
        />

        <Dimmer active={venues.isFetching}>
          <Loader size="large">
            Loading Venues...
          </Loader>
        </Dimmer>

        <Map
          venues={venues}
          map={this.props.map}
          selectedLocation={selectedLocation}
        />

        <List
          venues={venues}
          listCardHover={this.props.listCardHover}
          selectedLocation={selectedLocation}
          pageSelectedAndRequestVenues={this.props.pageSelectedAndRequestVenues}
          history={this.props.history}
        />

        <Dimmer active={!!errorMessage}>
          <h2 className="dimmer-error">{errorMessage}</h2>
        </Dimmer>
      </div>
    )
  }
}
