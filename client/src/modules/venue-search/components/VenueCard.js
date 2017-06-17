import React from 'react'
import PropTypes from 'prop-types'

import placeholderImg from '../../../img/venue-placeholder.jpg'

const VenueCard = ({ venue, handleCardClick, handleCardHover }) => (
  <div
    className="venue-card"
    role="presentation"
    onMouseEnter={() => { handleCardHover(venue._id) }}
    onMouseLeave={() => { handleCardHover(null) }}
    onClick={() => handleCardClick(venue)}>
    <img
      className="venue-card-img"
      src={venue.img || placeholderImg}
      alt={`${venue.title}`} />
    <div className="venue-card-info">
      <h3 className="venue-card-title">{venue.title}</h3>
      <div className="venue-card-address-box">
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
  handleCardHover: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
}

export default VenueCard
