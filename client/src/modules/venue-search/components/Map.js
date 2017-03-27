import React, { Component } from 'react'
import ReactMapboxGl, { Popup, ZoomControl } from 'react-mapbox-gl'

const mapboxToken = 'pk.eyJ1Ijoic2hvd3NwYXJrIiwiYSI6ImNqMGZiYXVsYTAxcXEycXF5c2p3dGl5OTQifQ.PjrdwcOoqtzC1plmlnlnrQ'

export default class Map extends Component {
  static propTypes = {

  }

  onPopupClick(venueId) { // eslint-disable-line
    console.log(venueId)
  }

  render() {
    const { venues } = this.props
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
                    onClick={() => this.onPopupClick(venue._id)}
                    className={venues.hoveredId === venue._id ? 'hovered' : ''}
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
