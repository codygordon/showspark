import React from 'react'
import PropTypes from 'prop-types'

import { logInUser, signUpUser } from '../auth'

const EmailAuthForm = ({ dispatch, auth }) => {
  const handleEmailAuth = (e) => {
    e.preventDefault()
    const user = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }
    auth.showingLogIn ?
    dispatch(logInUser(user)) : dispatch(signUpUser(user))
  }

  return (
    <form className="login-form" onSubmit={handleEmailAuth}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="email-login-input"
        placeholder="you@domain.com"
        name="email"
        type="email"
        ref={(ref) => { this.emailInput = ref }}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="email-login-input"
        placeholder="Password"
        name="password"
        type="password"
        ref={(ref) => { this.passwordInput = ref }}
      />
      <button className="button login-button">
        {auth.isFetching ? 'Logging in...' : 'Log In'}
      </button>
      <span
        className="email-auth-error"
        style={{ display: !auth.errorMessage ? 'none' : 'block' }}
      >{auth.errorMessage}</span>
    </form>
  )
}

EmailAuthForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default EmailAuthForm
