import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loader } from 'semantic-ui-react'

export default class EmailAuthForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    handleSignUpToggle: PropTypes.func.isRequired,
    handleEmailAuthSubmit: PropTypes.func.isRequired,
    handlePasswordResetClick: PropTypes.func.isRequired
  }

  state = {
    name: '',
    email: '',
    password: ''
  }

  handleSubmit = (e) => {
    const { name, email, password } = this.state
    const { handleEmailAuthSubmit } = this.props
    e.preventDefault()
    handleEmailAuthSubmit(email, password, name)
  }

  render() {
    const { auth, handleSignUpToggle, handlePasswordResetClick } = this.props
    return (
      <form
        className="email-auth-form"
        onSubmit={this.handleSubmit}>
        {auth.showingSignUp && <label htmlFor="your-name">Your Name</label>}
        {auth.showingSignUp &&
          <input
            id="your-name"
            className="name"
            placeholder="Brian Eno"
            name="your-name"
            type="text"
            required
            onChange={(e) => { this.setState({ name: e.target.value }) }} />
        }
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="email"
          placeholder="you@domain.com"
          name="email"
          type="email"
          required
          onChange={(e) => { this.setState({ email: e.target.value }) }} />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="password"
          placeholder="********"
          name="password"
          type="password"
          required
          onChange={(e) => { this.setState({ password: e.target.value }) }} />
        <div className="signup-toggle-submit">
          <span className="toggle-text">
            {auth.showingSignUp ? 'Have an account?' : 'Don\'t have an account?'}
          </span>
          <a
            role="button"
            tabIndex={0}
            className="toggle"
            onClick={handleSignUpToggle}>
            {auth.showingSignUp ? 'Log In' : 'Sign Up'}
          </a>
          <button className={!auth.isFetching ? 'submit' : 'submit loading'}>
            {!auth.showingSignUp ? (
              auth.isFetching
                ? <span><Loader inline size="small" /></span>
                : <span>Log In</span>
            ) : (
              auth.isFetching
                ? <span><Loader inline size="small" /></span>
                : <span>Sign Up</span>
            )}
          </button>
        </div>
        {!!auth.errorMessage &&
          <div className="error">
            <i className="fa fa-exclamation-circle" aria-hidden="true" />
            <span className="text">{auth.errorMessage}</span>
            {auth.errorMessage.includes('Wrong email or password') &&
              <a
                role="button"
                tabIndex={0}
                onClick={() => { handlePasswordResetClick(this.state.email) }}>
                Reset Password
              </a>
            }
          </div>
        }

      </form>
    )
  }
}
