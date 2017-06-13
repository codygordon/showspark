import React from 'react'
import PropTypes from 'prop-types'

import { showEmailAuthForm } from '../auth'

const EmailAuthButton = ({ dispatch, auth }) => (
  <button
    className="button email-auth-button"
    onClick={() => dispatch(showEmailAuthForm())}
  >
    <i className="fa fa-envelope-o" aria-hidden="true" />
    {auth.showingLogIn ? 'Log in' : 'Sign up'} with Email
  </button>
)

EmailAuthButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default EmailAuthButton
