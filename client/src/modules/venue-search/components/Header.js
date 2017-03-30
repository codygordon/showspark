import React from 'react'
import { Link } from 'react-router-dom'

import RegionSearch from '../../shared-components/RegionSearch'

const Header = props => (
  <header className="venue-search-header">
    <Link to="/" className="header-logo">
      SHOWSPARK <span className="header-logo-beta">BETA</span>
    </Link>
    <div className="venue-search-region-search">
      <RegionSearch
        history={props.history}
        region={props.region}
        regionSet={props.regionSet}
      />
    </div>
  </header>
)

export default Header
