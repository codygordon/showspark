import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { showSignUp, showLogIn } from '../auth/auth'

import AuthContainer from '../auth/AuthContainer'
import RegionSearch from './RegionSearch'

const VenuesHeader = ({ dispatch, history, auth, region }) => (
  <header className="venues-header">
    <Link to="/" className="header-logo">
      SHOWSPARK <span className="header-logo-beta">BETA</span>
    </Link>


    <div className="venues-region-search">
      <RegionSearch
        dispatch={dispatch}
        history={history}
        region={region}
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

        <AuthContainer auth={auth} />
      </div>
    )}
  </header>
)

VenuesHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
}

export default VenuesHeader
