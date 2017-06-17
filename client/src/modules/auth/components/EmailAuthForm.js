import React from 'react'
import PropTypes from 'prop-types'

const EmailAuthForm = ({ auth, handleSubmit, handleSignUpToggle }) => (
  <form
    className="email-auth-form"
    onSubmit={this.handleSubmit}>
    <label htmlFor="email">Email</label>
    <input
      id="email"
      className="email-auth-input"
      placeholder="you@domain.com"
      name="email"
      type="email"
      ref={(ref) => { this.emailInput = ref }} />
    <label htmlFor="password">Password</label>
    <input
      id="password"
      className="email-auth-input"
      placeholder="********"
      name="password"
      type="password"
      ref={(ref) => { this.passwordInput = ref }} />
    <button>
      {!auth.showingSignUp ? (
        auth.isFetching ? 'Logging in...' : 'Log in'
      ) : (
        auth.isFetching ? 'Signing up...' : 'Sign up'
      )}
    </button>
    <span
      className="error"
      style={{ display: !auth.errorMessage ? 'none' : 'block' }}>
      {auth.errorMessage}
    </span>
    <div className="signup-toggle">
      <span>Don&#39;t have an account?</span>
      <button onClick={handleSignUpToggle}>Sign Up</button>
    </div>
  </form>
)

EmailAuthForm.propTypes = {
  auth: PropTypes.object.isRequired,
  handleSignUpToggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
