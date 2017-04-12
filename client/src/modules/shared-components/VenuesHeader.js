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
    {props.auth.isAuthenticated ? (
      <div className="venues-header-logged-in">Logged IN!</div>
    ) : (
      <div className="venues-header-auth">
        <button
          className="button signup-button"
          onClick={props.showSignUp}
        >Sign Up</button>
        <button
          className="button login-button"
          onClick={props.showLogIn}
        >Log In</button>
      </div>
    )}
  </header>
)

export default VenuesHeader
