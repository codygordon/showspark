import React from 'react'
import PropTypes from 'prop-types'

import placeholderImg from '../../../img/default-placeholder.png'

import { listCardHover } from '../venueSearch'

const Card = ({ dispatch, venue, handleCardClick }) => (
  <button
    className="venue-card"
    tabIndex={0}
    onMouseEnter={() => { dispatch(listCardHover(venue._id)) }}
    onMouseLeave={() => { dispatch(listCardHover(null)) }}
    onClick={() => handleCardClick(venue)}>
    <img
      className="venue-card-img"
      src={venue.img || placeholderImg}
      // TODO: use Bing image search API to pull images in
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
  </button>
)

Card.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired
}

export default Card
