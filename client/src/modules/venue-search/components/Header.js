import React from 'react'
import { Link } from 'react-router-dom'

import LocationSearch from '../../shared-components/LocationSearch'

const Header = props => (
  <header className="venue-search-header">
    <Link to="/" className="header-logo" />
    <div className="venue-search-location-search">
      <LocationSearch
        locationSelectedAndRequestVenues={props.locationSelectedAndRequestVenues}
        locationSelected={props.locationSelected}
        selectedLocation={props.selectedLocation}
        history={props.history}
        venues={props.venues}
      />
    </div>
  </header>
)

export default Header
