import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Popup, ZoomControl } from 'react-mapbox-gl'

import { CSSTransitionGroup } from 'react-transition-group'

const mapboxToken = 'pk.eyJ1Ijoic2hvd3NwYXJrIiwiYSI6ImNqMGZiYXVsYTAxcXEycXF5c2p3dGl5OTQifQ.PjrdwcOoqtzC1plmlnlnrQ'

const VenueMap = ({ map, city, venues, ...props }) => (
  <section className="venue-map">
    <ReactMapboxGl
      accessToken={mapboxToken}
      style="mapbox://styles/mapbox/dark-v9" // eslint-disable-line
      center={city.coords ? [city.coords.longitude, city.coords.latitude] : [40, 40]}
      movingMethod="easeTo"
      attributionPosition="bottom-left"
      dragRotate={false}>
      <CSSTransitionGroup
        transitionName="venue-popups"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {venues.data.length > 0 &&
          venues.data.map((venue) => {
            if (venue.latitude && venue.longitude) {
              return (
                <span
                  key={venue._id}
                  className={venues.hoveredId === venue._id ? 'hovered' : ''}>
                  <Popup
                    coordinates={[venue.longitude, venue.latitude]}
                    anchor="bottom"
                    onClick={() => props.handlePopupClick(venue._id)}>
                    {venue.name}
                  </Popup>
                </span>
              )
            }
            return null
          })
        }
      </CSSTransitionGroup>
      <ZoomControl zoomDiff={1} />
    </ReactMapboxGl>
  </section>
  )

VenueMap.propTypes = {
  map: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  venues: PropTypes.object.isRequired,
  handlePopupClick: PropTypes.func.isRequired
}

export default VenueMap
