import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dimmer, Loader } from 'semantic-ui-react'
import FacebookAuthButton from './FacebookAuthButton'
import EmailAuthForm from './EmailAuthForm'

export default class Auth extends Component {
  static propTypes = {

  }

  componentWillMount() {
    const hash = this.props.location.hash
    if (this.props.isAuthenticated) this.props.handleLoggedIn()
    if (hash) this.props.handleLoginHash(hash)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) this.props.handleLoggedIn()
  }

  render() {
    return (
      <div className="auth">
        {this.props.isFetching &&
          <Dimmer active><Loader size="large">Logging in...</Loader></Dimmer>
        }
        <FacebookAuthButton handleClick={this.props.handleFacebookAuthClick} />
        <span className="divider">or with email</span>
        <EmailAuthForm
          location={this.props.location}
          errorMessage={this.props.errorMessage}
          alertMessage={this.props.alertMessage}
          handleEmailAuthSubmit={this.props.handleEmailAuthSubmit}
          handlePasswordResetClick={this.props.handleEmailAuthPasswordResetClick} />
      </div>
    )
  }
}
