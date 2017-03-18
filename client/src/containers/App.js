import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

import PlacesAutocomplete from 'react-places-autocomplete'

import Header from '../components/Header'
// import Venues from './Venues'
// import Map from './Map'

export default class App extends Component {
  static propTypes = {

  }

  componentWillMount() {

  }

  render() {
    let loading;
    const { venues } = this.props;
    venues.isFetching ? loading = 'active' : loading = '';

    if (venues.data) console.log(`${venues.data.length} venues loaded.`)

    return (
      <div className="app">
        <Header
          locationSelectedAndRequestVenues={this.props.locationSelectedAndRequestVenues}
          locationSelected={this.props.locationSelected}
          selectedLocation={this.props.selectedLocation.location}
        />
        <div>
          <Dimmer className={loading}>
            <Loader size="large" content="Loading venues...">&nbsp;</Loader>
          </Dimmer>
        </div>

        {/* TODO: display venue cards matching Search
            TODO: display map with markers for matching venues */}
      </div>
    )
  }
}
