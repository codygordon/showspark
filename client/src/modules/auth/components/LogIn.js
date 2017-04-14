import React, { Component } from 'react'

import { logInUser, logInUserGoogle, logInUserFacebook, closeLogIn, showSignUp } from '../auth'

export default class LogIn extends Component {
  static PropTypes = {

  }

  componentWillUnmount() {
    const { auth, dispatch } = this.props
    if (auth.showingLogIn) dispatch(closeLogIn())
  }

  handleEmailSignin = (e) => {
    e.preventDefault()
    const creds = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }
    this.props.dispatch(logInUser(creds))
  }

  render() {
    const { dispatch, auth } = this.props
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleEmailSignin}>
          <button
            className="button google-login"
            onClick={() => dispatch(logInUserGoogle())}
          >Log in with Google</button>
          <button
            className="button facebook-login"
            onClick={() => dispatch(logInUserFacebook())}
          >Log in with Facebook</button>
          <input
            className="input login-input"
            placeholder="you@domain.com"
            name="email"
            type="email"
            ref={(ref) => { this.emailInput = ref }}
          />
          <input
            className="input login-input"
            placeholder="Password"
            name="password"
            type="password"
            ref={(ref) => { this.passwordInput = ref }}
          />
          <button className="button login-button">
            {auth.isFetching ? 'Logging in...' : 'Log In'}
          </button>
          <div className="login-signup">
            <span>Don&#39;t have an account?</span>
            <button
              className="button signup-button"
              onClick={() => {
                dispatch(closeLogIn())
                dispatch(showSignUp())
              }}
            >Sign Up</button>
          </div>
        </form>
        <span
          className="login-error"
          style={{
            display: !auth.errorMessage || auth.errorMessage.length === 0 ? 'none' : 'block'
          }}
        >{auth.errorMessage}</span>
      </div>
    )
  }
}
