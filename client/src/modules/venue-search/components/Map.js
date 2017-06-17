import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Popup, ZoomControl } from 'react-mapbox-gl'

const mapboxToken = 'pk.eyJ1Ijoic2hvd3NwYXJrIiwiYSI6ImNqMGZiYXVsYTAxcXEycXF5c2p3dGl5OTQifQ.PjrdwcOoqtzC1plmlnlnrQ'

const VenueMap = ({ map, region, venues, handlePopupClick }) => (
  <section className="venue-div">
    <ReactMapboxGl
      accessToken={mapboxToken}
      style="mapbox://styles/mapbox/streets-v10" // eslint-disable-line
      center={region.coords || map.center}
      zoom={map.zoom}
      movingMethod="easeTo"
      attributionPosition="bottom-left"
      dragRotate={false}>
      {venues.data.length > 0 &&
        venues.data.map((venue) => {
          if (venue.address && venue.location.latitude && venue.location.longitude) {
            return (
              <span
                key={venue._id}
                className={venues.hoveredId === venue._id ? 'hovered' : ''}>
                <Popup
                  coordinates={[venue.location.latitude, venue.location.longitude]}
                  anchor="bottom"
                  onClick={() => handlePopupClick(venue._id)}>
                  {venue.title}
                </Popup>
              </span>
            )
          }
          return null
        })
      }
      <ZoomControl zoomDiff={1} />
    </ReactMapboxGl>
  </section>
  )

VenueMap.propTypes = {
  map: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired,
  handlePopupClick: PropTypes.func.isRequired
}

export default VenueMap
