import React from 'react'
import { Link } from 'react-router-dom'

import { showSignUp, showLogIn } from '../auth/auth'

import Auth from '../auth/container/Auth'
import RegionSearch from './RegionSearch'

const VenuesHeader = ({ dispatch, history, region, auth }) => (
  <header className="venues-header">
    <Link to="/" className="header-logo">
      SHOWSPARK <span className="header-logo-beta">BETA</span>
    </Link>


    <div className="venues-region-search">
      <RegionSearch
        history={history}
        region={region}
        dispatch={dispatch}
      />
    </div>


    {auth.isAuthenticated ? (
      <div className="venues-header-logged-in">Logged IN!</div>
    ) : (
      <div className="venues-header-auth">
        <button
          className="button signup-button"
          onClick={() => dispatch(showSignUp())}
        >Sign Up</button>
        <button
          className="button login-button"
          onClick={() => dispatch(showLogIn())}
        >Log In</button>

        <Auth auth={auth} />
      </div>
    )}
  </header>
)

export default VenuesHeader
