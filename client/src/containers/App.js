import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import PlacesAutocomplete from 'react-places-autocomplete'
import queryString from 'query-string'

import Header from '../components/Header'
import VenueList from '../components/VenueList'
import VenueMap from '../components/VenueMap'

export default class App extends Component {
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

  componentWillReceiveProps(nextProps) {
    const thisQuery = queryString.parse(this.props.location.search)
    const nextQuery = queryString.parse(nextProps.location.search)
    if (nextQuery['location-text'] && nextQuery.page) {
      const thisText = thisQuery['location-text']
      const thisPage = thisQuery.page
      const nextText = nextQuery['location-text']
      const nextPage = nextQuery.page
      const limit = this.props.venues.perPage
      const offset = (nextPage - 1) * limit
      if (thisText !== nextText) {
        this.props.locationSelectedAndRequestVenues(nextText, limit, offset, thisPage)
      }
      if (thisPage !== nextPage) {
        this.props.pageSelectedAndRequestVenues(thisText, limit, offset, nextPage)
      }
    }
  }

  render() {
    let loading;
    const { venues, selectedLocation } = this.props
    const errorMessage = selectedLocation.errorMessage ? selectedLocation.errorMessage : venues.errorMessage

    return (
      <div className="app">
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

        <VenueMap
          venues={venues}
          map={this.props.map}
          selectedLocation={selectedLocation}
        />

        <VenueList
          venues={venues}
          venueListCardHover={this.props.venueListCardHover}
          selectedLocation={selectedLocation}
          pageSelectedAndRequestVenues={this.props.pageSelectedAndRequestVenues}
          history={this.props.history}
        />

        <Dimmer active={!!errorMessage}>
          <h2 className="dimmer-error">{errorMessage}</h2>
        </Dimmer>

        {/* TODO: display venue cards matching Search */}
      </div>
    )
  }
}
