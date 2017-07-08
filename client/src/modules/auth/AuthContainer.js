import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FacebookAuthButton from './components/FacebookAuthButton'
import EmailAuthForm from './components/EmailAuthForm'

import AuthService from '../../utils/auth-service'

const auth0 = new AuthService()

export default class AuthContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    errorMessage: null,
    alertMessage: null
  }

  handleFacebookAuthClick = () => {
    auth0.loginWithFacebook((err) => {
      if (err) this.setState({ errorMessage: err })
    })
  }

  handleEmailAuthSubmit = (email, password, signUp, name) => {
    if (signUp) {
      auth0.signupWithEmail(email, password, name, (err, res) => {
        if (err) this.setState({ errorMessage: err.description })
        else {
          auth0.loginWithEmail(email, password, (err, res) => {
            if (err) this.setState({ errorMessage: err.description })
          })
        }
      })
    } else {
      auth0.loginWithEmail(email, password, (err, res) => {
        if (err) this.setState({ errorMessage: err.description })
      })
    }
  }

  handleEmailAuthPasswordResetClick = (email) => {
    auth0.resetPassword(email, (err, res) => {
      if (err) this.setState({ errorMessage: err.description })
      else this.setState({ errorMessage: '', alertMessage: res })
    })
  }

  render() {
    const { location } = this.props
    const { errorMessage, alertMessage } = this.state
    return (
      <div className="auth-container">
        <FacebookAuthButton handleClick={this.handleFacebookAuthClick} />
        <span className="divider">or with email</span>
        <EmailAuthForm
          location={location}
          errorMessage={errorMessage}
          alertMessage={alertMessage}
          handleEmailAuthSubmit={this.handleEmailAuthSubmit}
          handlePasswordResetClick={this.handleEmailAuthPasswordResetClick} />
      </div>
    )
  }
}
