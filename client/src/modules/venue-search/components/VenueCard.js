import React from 'react'
import PropTypes from 'prop-types'

import placeholderImg from '../../../img/venue-placeholder.jpg'

const VenueCard = ({ venue, handleClick, handleHover }) => (
  <div
    className="venue-card"
    role="presentation"
    style={{
      backgroundImage: `url(${venue.photoUrl || placeholderImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}
    onMouseEnter={() => { handleHover(venue._id) }}
    onMouseLeave={() => { handleHover(null) }}
    onClick={() => handleClick(venue)}>
    <h3>{venue.name}</h3>
    <div className="details">
      <div className="address">
        <div className="venue-card-address">
          {venue.address.street} {venue.address.city}, {venue.address.state} {venue.address.zip}
        </div>
        <div className="venue-card-capacity">
          <span>Capacity:</span> {venue.capacity}
        </div>
      </div>
    </div>
  </div>
)

VenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
  handleHover: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default VenueCard
