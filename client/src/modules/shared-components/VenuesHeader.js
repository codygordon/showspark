import React from 'react'
import { Link } from 'react-router-dom'

import RegionSearch from './RegionSearch'

const VenuesHeader = props => (
  <header className="venues-header">
    <Link to="/" className="header-logo">
      SHOWSPARK <span className="header-logo-beta">BETA</span>
    </Link>
    <div className="venues-region-search">
      <RegionSearch
        history={props.history}
        region={props.region}
        regionSet={props.regionSet}
      />
    </div>
  </header>
)

export default VenuesHeader
