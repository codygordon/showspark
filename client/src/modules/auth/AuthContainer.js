import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import * as actions from './actions'

import GoogleAuthButton from './components/GoogleAuthButton'
import FacebookAuthButton from './components/FacebookAuthButton'
import EmailAuthForm from './components/EmailAuthForm'

class Auth extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  authClose = () => {
    const { dispatch, location, history } = this.props
    dispatch(actions.showAuthToggle())
    history.push(`${location.pathname}?${location.search}`.replace('&showAuth=true', ''))
  }

  handleGoogleAuthClick = () => {
    const { dispatch } = this.props
    // dispatch(actions.)
  }

  handleFacebookAuthClick = () => {
    const { dispatch } = this.props
    // dispatch(actions.)
  }

  handleSignUpToggleClick = () => {
    const { dispatch } = this.props
    dispatch(actions.showSignUpToggle())
  }

  handleEmailAuthLogInSubmit = (e) => {
    e.preventDefault()
    const { auth, dispatch, location } = this.props
    const email = this.emailInput.value
    const password = this.passwordInput.value
    const uri = location.href

    auth.showingSignUp
      ? dispatch(actions.logInUser(email, password, uri))
      : dispatch(actions.signUpUser(email, password, uri))
  }

  render() {
    const { dispatch, auth } = this.props
    return (
      <Modal
        basic
        open={auth.showingAuth}
        onClose={this.authClose}>
        <div className="auth-container">
          <GoogleAuthButton handleClick={this.handleGoogleAuthClick} />
          <FacebookAuthButton handleClick={this.handleFacebookAuthClick} />
          <EmailAuthForm
            handleSignUpToggle={this.handleSignUpToggleClick}
            handleSubmit={this.handleEmailAuthSubmit} />
        </div>
      </Modal>
    )
  }
}

const AuthContainer = connect()(Auth)

export default AuthContainer
