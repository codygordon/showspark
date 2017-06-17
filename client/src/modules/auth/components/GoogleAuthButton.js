import React from 'react'
import PropTypes from 'prop-types'

import googleIcon from '../../../img/google-oauth-icon.svg'

const GoogleAuth = ({ handleClick }) => (
  <button
    className="google-auth-button"
    onClick={handleClick}>
    <img src={googleIcon} alt="google" />
    <span>Log in with Google</span>
  </button>
)

GoogleAuth.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default GoogleAuth
