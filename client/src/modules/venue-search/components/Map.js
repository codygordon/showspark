import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Popup, ZoomControl } from 'react-mapbox-gl'

const mapboxToken = 'pk.eyJ1Ijoic2hvd3NwYXJrIiwiYSI6ImNqMGZiYXVsYTAxcXEycXF5c2p3dGl5OTQifQ.PjrdwcOoqtzC1plmlnlnrQ'

const Map = ({ map, region, venues }) => {
  const onPopupClick = (venueId) => {
    console.log(venueId) // eslint-disable-line
  }

  return (
    <section className="map-container">
      <ReactMapboxGl
        accessToken={mapboxToken}
        style="mapbox://styles/mapbox/streets-v10" // eslint-disable-line
        center={region.coords || map.center}
        zoom={map.zoom}
        movingMethod="easeTo"
        attributionPosition="bottom-left"
        dragRotate={false}
      >
        {venues.data.length > 0 &&
            venues.data.map((venue) => { // eslint-disable-line
              if (venue.address && venue.address.lng && venue.address.lat) {
                return (
                  <Popup
                    key={venue._id}
                    coordinates={[venue.address.lng, venue.address.lat]}
                    anchor="bottom"
                    properties={venue}
                    onClick={() => onPopupClick(venue._id)}
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
    </section>
  )
}

Map.propTypes = {
  map: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired
}

export default Map
