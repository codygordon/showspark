import React from 'react'
import PropTypes from 'prop-types'

import { logInUserFacebook } from '../auth'

const FacebookAuthButton = ({ dispatch }) => (
  <button
    className="button facebook-auth"
    onClick={() => dispatch(logInUserFacebook())}
  >
    <i className="fa fa-facebook-official" aria-hidden="true" />&nbsp;
    Log in with Facebook
  </button>
)

FacebookAuthButton.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default FacebookAuthButton
