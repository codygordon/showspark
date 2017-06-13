import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { logInUser, signUpUser, showSignUp } from '../auth'

export default class EmailAuthForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  handleEmailAuth = (e) => {
    e.preventDefault()
    const { dispatch, location, auth } = this.props
    const email = this.emailInput.value
    const password = this.passwordInput.value
    const uri = location.href

    auth.showingAuth ?
    dispatch(logInUser(email, password, uri)) :
    dispatch(signUpUser(email, password, uri))
  }

  handleSignupSwitchClick = (e) => {
    e.preventDefault()
    this.props.dispatch(showSignUp())
  }

  render() {
    const { auth } = this.props
    return (
      <form className="email-auth-form" onSubmit={this.handleEmailAuth}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="email-auth-input"
          placeholder="you@domain.com"
          name="email"
          type="email"
          ref={(ref) => { this.emailInput = ref }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="email-auth-input"
          placeholder="********"
          name="password"
          type="password"
          ref={(ref) => { this.passwordInput = ref }}
        />
        <button className="button email-auth-form-button">
          {!auth.showingSignUp &&
            (auth.isFetching ? 'Logging in...' : 'Log in')}
          {auth.showingSignUp &&
            (auth.isFetching ? 'Signing up...' : 'Sign up')}
        </button>
        <span
          className="email-auth-error"
          style={{ display: !auth.errorMessage ? 'none' : 'block' }}
        >{auth.errorMessage}</span>
        <div className="login-signup-switch">
          <span>Don&#39;t have an account?</span>
          <button
            className="signup-switch-button"
            onClick={this.handleSignupSwitchClick}
          >Sign Up</button>
        </div>
      </form>
    )
  }
}
