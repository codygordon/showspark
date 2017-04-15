import React from 'react'
import PropTypes from 'prop-types'

import Genres from './Genres'
// import Map from './Map'

const Info = ({ venue }) => (
  <div className="venue-info">
    <div className="venue-info-items-container">
      {venue.address &&
        <div className="venue-info-item lg">
          <i className="fa fa-map-marker" aria-hidden="true" />
          <span className="venue-info-item-content">
            {venue.address.street}&nbsp;
            <span className="venue-info-item-city">
              {venue.address.city},&nbsp;{venue.address.state}
            </span>
          </span>
        </div>
      }
      <div className="venue-info-item sm">
        <i className="fa fa-users" aria-hidden="true" />
        <span className="venue-info-item-content">
          <span className="venue-info-item-title">Capacity</span>
          {venue.capacity}
        </span>
      </div>
      <div className="venue-info-item sm">
        <i className="fa fa-id-card-o" aria-hidden="true" />
        <span className="venue-info-item-content">
          <span className="venue-info-item-title">Ages</span>
          {venue.ages}
        </span>
      </div>
      {/* <div className="venue-info-item-lg">
        <span className="venue-info-item-title">Website</span>
        <a className="venue-info-item-content" href={`http://${venue.web}`} rel="external noopener noreferrer" target="_blank">{venue.web}</a>
      </div> */}
    </div>
    {venue.genres && <Genres genres={venue.genres} />}
    {/* TODO: add a map component */}
  </div>
)

Info.propTypes = {
  venue: PropTypes.object.isRequired
}

export default Info
