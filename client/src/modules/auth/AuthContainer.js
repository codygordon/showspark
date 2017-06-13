import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import './auth.css'

import GoogleAuthButton from './components/GoogleAuthButton'
import FacebookAuthButton from './components/FacebookAuthButton'
import EmailAuthButton from './components/EmailAuthButton'
import EmailAuthForm from './components/EmailAuthForm'

class Auth extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  componentWillUnmount() {
    const { location, history } = this.props
    const newSearch =
      location.search.replace('&showAuth=true', '')
    history.push(`${location.pathname}${newSearch}`)
  }

  authClose = () => {
    const { location, history } = this.props
    const newSearch = location.search.replace('&showAuth=true', '')
    history.push(`${location.pathname}${newSearch}`)
  }

  render() {
    const { location, dispatch, auth } = this.props
    return (
      <Modal
        basic
        open={auth.showingAuth}
        onClose={this.authClose}
      >
        {!auth.showingEmailAuthForm ? (
          <div className="auth-container">
            <GoogleAuthButton dispatch={dispatch} />
            <FacebookAuthButton dispatch={dispatch} />
            <EmailAuthButton dispatch={dispatch} auth={auth} />
          </div>
        ) : (
          <div className="auth-container">
            <EmailAuthForm
              dispatch={dispatch}
              location={location}
              auth={auth}
            />
          </div>
        )}
      </Modal>
    )
  }
}

const AuthContainer = connect()(Auth)

export default AuthContainer
