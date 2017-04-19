import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import './auth.css'

import { closeLogIn, closeSignUp, showSignUp, showLogIn } from './auth'

import GoogleAuthButton from './components/GoogleAuthButton'
import FacebookAuthButton from './components/FacebookAuthButton'
import EmailAuthButton from './components/EmailAuthButton'
import EmailAuthForm from './components/EmailAuthForm'

class Auth extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  componentWillUnmount() {
    const { auth, dispatch } = this.props
    if (auth.showingLogIn) dispatch(closeLogIn())
    else if (auth.showingSignUp) dispatch(closeSignUp())
  }

  authClose = () => {
    const { dispatch, auth } = this.props
    auth.showingLogIn ? dispatch(closeLogIn()) : dispatch(closeSignUp())
  }

  render() {
    const { dispatch, auth } = this.props
    return (
      <Modal
        className="auth-container"
        basic
        open={auth.showingLogIn || auth.showingSignUp}
        onClose={this.authClose}
      >
        <GoogleAuthButton dispatch={dispatch} />
        <FacebookAuthButton dispatch={dispatch} />
        <EmailAuthButton dispatch={dispatch} auth={auth} />
        {auth.showingEmailForm &&
          <EmailAuthForm dispatch={dispatch} auth={auth} />
        }
        {auth.showingLogIn ? (
          <div className="login-signup-switch">
            <span>Don&#39;t have an account?</span>
            <button
              className="button signup-button"
              onClick={() => dispatch(showSignUp())}
            >Sign Up</button>
          </div>
        ) : (
          <div className="login-signup-switch">
            <span>Already have an account?</span>
            <button
              className="button login-button"
              onClick={() => dispatch(showLogIn())}
            >Log In</button>
          </div>
        )}
      </Modal>
    )
  }
}

const AuthContainer = connect()(Auth)

export default AuthContainer
