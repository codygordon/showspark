import React from 'react'
import PropTypes from 'prop-types'

import { signUpUser, logInUserGoogle, logInUserFacebook, closeSignUp, showLogIn } from '../auth'


export default class SignUp extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  componentWillUnmount() {
    const { auth, dispatch } = this.props
    if (auth.showingSignUp) dispatch(closeSignUp())
  }

  handleEmailSignup = (e) => {
    e.preventDefault()
    const user = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }
    this.props.dispatch(signUpUser(user))
  }

  render() {
    const { dispatch, auth } = this.props
    return (
      <div className="signup">
        <button
          className="google-signup"
          onClick={() => dispatch(logInUserGoogle())}
        >Sign up with Google</button>
        <button
          className="facebook-signup"
          onClick={() => dispatch(logInUserFacebook())}
        >Sign up with Facebook</button>
        <form className="email-signup" onSubmit={this.handleEmailSignup}>
          <input
            placeholder="you@domain.com"
            name="email"
            type="email"
            ref={(ref) => { this.emailInput = ref }}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            ref={(ref) => { this.passwordInput = ref }}
          />
          <button>
            {auth.isFetching ? 'Signing up...' : 'Sign up!'}
          </button>
          <div className="login-signup">
            <span>Already have an account?</span>
            <button
              className="button signup-button"
              onClick={() => dispatch(showLogIn())}
            >Log In</button>
          </div>
        </form>
      </div>
    )
  }
}
