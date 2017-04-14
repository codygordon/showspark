import React from 'react'
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
      closeIcon="close"
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

const Auth = connect()(AuthContainer)

export default Auth
