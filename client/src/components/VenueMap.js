import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Popup, ZoomControl } from 'react-mapbox-gl'

let mapboxToken;

if (process.env.NODE_ENV === 'production') {
  mapboxToken = process.env.MAPBOX_API_TOKEN
} else {
  // eslint-disable-next-line
  mapboxToken = require('../utils/devConfig').MAPBOX_API_TOKEN
}

export default class VenueMap extends Component {
  static propTypes = {

  }

  componentWillReceiveProps(nextProps) {

  }

  onVenuePopupClick(e) {
    console.log(e)
  }


  render() {
    const { venues } = this.props

    let markers = null
    return (
      <div className="map-container">
        <ReactMapboxGl
          accessToken={mapboxToken}
          style="mapbox://styles/mapbox/streets-v10" // eslint-disable-line
          center={this.props.selectedLocation.coords || this.props.map.center}
          zoom={this.props.map.zoom}
          movingMethod="easeTo"
          attributionPosition="bottom-left"
          dragRotate={false}
          // onZoom={(map) => { const zoom = map.getZoom(); console.log(zoom) }}
          // fitBounds={fitBounds}
          // minZoom={8}
          // maxZoom={15}
          // maxBounds={maxBounds} // TODO: add bounds for U.S.
          // onDrag={this._onDrag}
        >
          {venues.data.length > 0 &&
            venues.data.map((venue, i) => { // eslint-disable-line
              if (venue.address && venue.address.lng && venue.address.lat) {
                return (
                  <Popup
                    key={venue._id}
                    index={i}
                    coordinates={[venue.address.lng, venue.address.lat]}
                    anchor="bottom"
                    properties={venue}
                    onClick={this.onVenuePopupClick}
                    className={venues.hoveredVenueId === venue._id ? 'hovered' : ''}
                  >
                    {/* <i className="fa fa-circle-o" aria-hidden="true" /> */}
                    <span className="venue-popup-title">{venue.title}</span>
                  </Popup>
                )
              }
            })
          }

          <ZoomControl zoomDiff={1} />
        </ReactMapboxGl>
      </div>
    )
  }
}
