import React from 'react'

import Genres from './Genres'
import Map from './Map'

const Info = ({ address, capacity, genres }) => (
  <div className="venue-info">
    {genres && <Genres genres={genres} />}
    {address &&
      <span className="venue-info-address">
        {address.street} {address.city}, {address.state}
      </span>
    }
    <span className="venue-info-capacity">Capacity: {capacity}</span>
    {/* MAP */}
  </div>
)

export default Info
