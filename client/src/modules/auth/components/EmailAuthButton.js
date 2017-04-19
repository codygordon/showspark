import React from 'react'
import PropTypes from 'prop-types'

import { showEmailLogin } from '../auth'

const EmailAuthButton = ({ dispatch, auth }) => (
  <button
    className="button email-auth"
    onClick={() => dispatch(showEmailLogin())}
  >
    <i className="fa fa-envelope-o" aria-hidden="true" />&nbsp;
    {auth.showingLogIn ? 'Log in' : 'Sign up'} with Email
  </button>
)

EmailAuthButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default EmailAuthButton
