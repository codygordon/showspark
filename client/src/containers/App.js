import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

import PlacesAutocomplete from 'react-places-autocomplete'

import Header from '../components/Header'
// import Map from './Map'

export default class App extends Component {
  static propTypes = {

  }

  componentWillMount() {

  }

  render() {
    let loading;

    return (
      <div className="app">
        <Header
          locationSelected={this.props.locationSelectedAndRequestVenues}
          selectedLocation={this.props.selectedLocation.location}
        />
        {/* <Dimmer className={loading}>
          <Loader size="large">&nbsp;</Loader>
        </Dimmer> */}
      </div>
    )
  }
}
