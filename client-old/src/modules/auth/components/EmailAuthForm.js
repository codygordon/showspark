import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loader } from 'semantic-ui-react'

export default class EmailAuthForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    alertMessage: PropTypes.string,
    handleEmailAuthSubmit: PropTypes.func.isRequired,
    handlePasswordResetClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    errorMessage: '',
    alertMessage: ''
  }

  state = {
    isFetching: false,
    showSignUp: false,
    name: '',
    email: '',
    password: ''
  }

  componentWillMount() {
    const { location } = this.props
    if (location.pathname === '/login') this.setState({ isFetching: true })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage || nextProps.alertMessage) {
      this.setState({ isFetching: false })
    }
  }

  handleSubmit = (e) => {
    const { name, email, password, showSignUp } = this.state
    const { handleEmailAuthSubmit } = this.props
    e.preventDefault()
    this.setState({ isFetching: true })
    handleEmailAuthSubmit(email, password, showSignUp, name)
  }

  render() {
    const { errorMessage, alertMessage, handlePasswordResetClick } = this.props
    const { isFetching, showSignUp } = this.state
    return (
      <form
        className="email-auth-form"
        onSubmit={this.handleSubmit}>
        {showSignUp && <label htmlFor="your-name">Your Name</label>}
        {showSignUp &&
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
            {showSignUp ? 'Have an account?' : 'Don\'t have an account?'}
          </span>
          <a
            role="button"
            tabIndex={0}
            className="toggle"
            onClick={() => this.setState({ showSignUp: !this.state.showSignUp })}>
            {showSignUp ? 'Log In' : 'Sign Up'}
          </a>
          <button className={!isFetching ? 'submit' : 'submit loading'}>
            {!showSignUp ? (
              isFetching
                ? <span><Loader inline size="small" /></span>
                : <span>Log In</span>
            ) : (
              isFetching
                ? <span><Loader inline size="small" /></span>
                : <span>Sign Up</span>
            )}
          </button>
        </div>
        {(errorMessage || alertMessage) &&
          <div className={errorMessage ? 'error' : 'alert'}>
            {errorMessage &&
              <i className="fa fa-exclamation-circle" aria-hidden="true" />
            }
            <span className="text">{errorMessage || alertMessage}</span>
            {errorMessage.includes('Wrong email or password') &&
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
