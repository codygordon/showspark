import React from 'react'
import PropTypes from 'prop-types'

import { logInUserGoogle } from '../auth'

const GoogleAuth = ({ dispatch }) => (
  <button
    className="button google-auth-button"
    onClick={() => dispatch(logInUserGoogle())}
  >
    <i className="fa fa-google" aria-hidden="true" />
    Log in with Google
  </button>
)

GoogleAuth.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default GoogleAuth
