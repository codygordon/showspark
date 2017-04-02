import React from 'react'

import Genres from './Genres'
import Map from './Map'

const Info = ({ venue }) => (
  <div className="venue-info">
    <div className="venue-info-container">
      {venue.address &&
        <div className="venue-info-item-lg">
          <span className="venue-info-item-title">Address</span>
          <span className="venue-info-item-content">
            {venue.address.street}<br />
            <span className="venue-info-item-city">
              {venue.address.city},&nbsp;{venue.address.state}
            </span>
          </span>
        </div>
      }
      <div className="venue-info-item-sm">
        <span className="venue-info-item-title">Capacity</span>
        <span className="venue-info-item-content">{venue.capacity}</span>
      </div>
      <div className="venue-info-item-sm">
        <span className="venue-info-item-title">Ages</span>
        <span className="venue-info-item-content">{venue.ages}</span>
      </div>
      <div className="venue-info-item-lg">
        <span className="venue-info-item-title">Website</span>
        <a className="venue-info-item-content" href={`http://${venue.web}`} rel="external noopener noreferrer" target="_blank">{venue.web}</a>
      </div>
    </div>
    {venue.genres && <Genres genres={venue.genres} />}
    {/* TODO: add a map component */}
  </div>
)

export default Info
