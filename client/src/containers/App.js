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

  render() {
    let loading;
    const { venues } = this.props

    return (
      <div className="app">
        <Header
          locationSelectedAndRequestVenues={this.props.locationSelectedAndRequestVenues}
          locationSelected={this.props.locationSelected}
          selectedLocation={this.props.selectedLocation}
        />
        <Dimmer active={venues.isFetching}>
          <Loader size="large" content="Loading map...">&nbsp;</Loader>
        </Dimmer>

        <Map
          venues={this.props.venues}
          map={this.props.map}
          selectedLocation={this.props.selectedLocation}
        />

        {/* TODO: display venue cards matching Search */}
      </div>
    )
  }
}
