import React from 'react'
import { Link } from 'react-router-dom'

import LocationSearch from './LocationSearch'

const Header = props => (
  <div className="header">
    <Link to={'/'} className="header-logo" />
    <LocationSearch
      locationSelectedAndRequestVenues={props.locationSelectedAndRequestVenues}
      locationSelected={props.locationSelected}
      selectedLocation={props.selectedLocation}
      history={props.history}
      venues={props.venues}
    />
  </div>
)

export default Header
