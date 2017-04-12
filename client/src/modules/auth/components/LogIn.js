import React, { Component } from 'react'

export default class LogIn extends Component {
  static PropTypes = {

  }

  componentWillUnmount() {
    if (this.props.auth.showingLogIn) this.props.authActions.closeLogIn()
  }

  handleEmailSignin = (e) => {
    e.preventDefault()
    const creds = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }
    this.props.authActions.logInUser(creds)
  }

  render() {
    const errorMsg = this.props.auth.errorMessage
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleEmailSignin}>
          <div className="auth-close">
            <button
              className="close-auth-button"
              onClick={() => this.props.authActions.closeLogIn()}
            >CLOSE X</button>
          </div>
          <button
            className="button google-login"
            onClick={() => this.props.authActions.logInUserGoogle()}
          >Log in with Google</button>
          <button
            className="button facebook-login"
            onClick={() => this.props.authActions.logInUserFacebook()}
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
            {this.props.auth.isFetching ? 'Logging in...' : 'Log In'}
          </button>
          <div className="login-signup">
            <span>Don&#39;t have an account?</span>
            <button
              className="button signup-button"
              onClick={() => this.props.authActions.showSignUp()}
            >Sign Up</button>
          </div>
        </form>
        <span
          className="login-error"
          style={{
            display: !errorMsg || errorMsg.length === 0 ? 'none' : 'block'
          }}
        >{errorMsg}</span>
      </div>
    )
  }
}
