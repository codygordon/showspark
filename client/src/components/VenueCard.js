import React from 'react'
import { throttle } from 'lodash'

import placeholderImg from '../img/default-placeholder.png'

const VenueCard = ({ venue, venueListCardHover }) => (
  <div
    className="venue-card"
    onMouseEnter={() => { venueListCardHover(venue._id) }}
    onMouseLeave={() => { venueListCardHover(null) }}
  >
    <img
      className="venue-card-img"
      src={venue.img || placeholderImg}
      // TODO: use Bing image search API to pull images in
      alt={`${venue.title}`}
    />
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

export default VenueCard
