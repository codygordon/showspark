import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import '../auth.css'

import { closeLogIn, closeSignUp } from '../auth'

import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'

const AuthContainer = ({ dispatch, auth }) => {
  const authClose = () => {
    auth.showingLogIn ? dispatch(closeLogIn()) : dispatch(closeSignUp())
  }

  return (
    <Modal
      basic
      open={auth.showingLogIn || auth.showingSignUp}
      onClose={authClose}
    >
      <div className="auth-container">
        {auth.showingLogIn &&
          <LogIn
            dispatch={dispatch}
            auth={auth}
          />
        }
        {auth.showingSignUp &&
          <SignUp
            dispatch={dispatch}
            auth={auth}
          />
        }
      </div>
    </Modal>
  )
}

AuthContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const Auth = connect()(AuthContainer)

export default Auth
