import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import PlacesAutocomplete from 'react-places-autocomplete'

import Header from '../components/Header'
// import Venues from './Venues'
import Map from '../components/Map'

export default class App extends Component {
  static propTypes = {

  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  paginateVenues = (venues) => {

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
        />
        <Dimmer active={venues.isFetching}>
          <Loader size="large" content="Loading map...">&nbsp;</Loader>
        </Dimmer>

        <Map
          venues={venues}
          map={this.props.map}
          selectedLocation={selectedLocation}
        />

        <div className="list-container" />

        <Dimmer active={errorMessage}>
          <h2 className="dimmer-error">{errorMessage}</h2>
        </Dimmer>

        {/* TODO: display venue cards matching Search */}
      </div>
    )
  }
}
