import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

let mapboxToken;

if (process.env.NODE_ENV === 'production') {
  mapboxToken = process.env.MAPBOX_API_TOKEN
} else {
  // eslint-disable-next-line
  mapboxToken = require('../utils/devConfig').MAPBOX_API_TOKEN
}

export default class Map extends Component {
  static propTypes = {

  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="map-container">
        <ReactMapboxGl
          style="mapbox://styles/mapbox/streets-v10" // eslint-disable-line
          center={this.props.selectedLocation.coords || this.props.map.center}
          zoom={this.props.map.zoom}
          movingMethod="easeTo"
          attributionPosition="bottom-rght"
          // fitBounds={fitBounds}
          // minZoom={8}
          // maxZoom={15}
          // maxBounds={maxBounds} // TODO: add bounds for U.S.
          accessToken={mapboxToken}
          // onDrag={this._onDrag}
        />
      </div>
    )
  }
}
