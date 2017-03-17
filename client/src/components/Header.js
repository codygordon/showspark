import React from 'react'
import { Link } from 'react-router-dom'

import LocationSearch from './LocationSearch'

const Header = props => (
  <div className="header">
    <Link to={'/'} className="header-logo" />
    <LocationSearch
      locationSelected={props.locationSelected}
      selectedLocation={props.selectedLocation}
    />
  </div>
)

export default Header
