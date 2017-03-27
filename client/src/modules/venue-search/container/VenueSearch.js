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
