import React from 'react'

import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'

import '../auth.css'

const Auth = props => (
  <div className="auth-container">
    {props.auth.showingLogIn &&
      <LogIn
        auth={props.auth}
        authActions={props.authActions}
      />
    }
    {props.auth.showingSignUp &&
      <SignUp
        auth={props.auth}
        authActions={props.authActions}
      />
    }
  </div>
)

export default Auth
