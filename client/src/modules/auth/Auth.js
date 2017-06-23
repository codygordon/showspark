import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FacebookAuthButton from './components/FacebookAuthButton'
import EmailAuthForm from './components/EmailAuthForm'

import * as actions from './actions'

class AuthContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  handleFacebookAuthClick = () => {
    const { dispatch } = this.props
    dispatch(actions.logInUserFacebook())
  }

  handleSignUpToggleClick = () => {
    const { dispatch } = this.props
    dispatch(actions.showSignUpToggle())
  }

  handleEmailAuthSubmit = (email, password, name) => {
    const { auth, dispatch } = this.props

    auth.showingSignUp
      ? dispatch(actions.signUpUserEmail(email, password, name))
      : dispatch(actions.logInUserEmail(email, password))
  }

  handleEmailAuthPasswordResetClick = (email) => {
    const { dispatch } = this.props
    dispatch(actions.resetUserPassword(email))
  }

  render() {
    const { auth } = this.props
    return (
      <div className="auth-container">
        <FacebookAuthButton handleClick={this.handleFacebookAuthClick} />
        <span className="divider">or with email</span>
        <EmailAuthForm
          auth={auth}
          handleSignUpToggle={this.handleSignUpToggleClick}
          handleEmailAuthSubmit={this.handleEmailAuthSubmit}
          handlePasswordResetClick={this.handleEmailAuthPasswordResetClick} />
      </div>
    )
  }
}

const Auth = connect()(AuthContainer)

export default Auth
