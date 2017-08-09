import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Auth from './components/Auth'

import * as actions from './actions'

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  handleFacebookAuthClick: () => {
    dispatch(actions.loginWithFacebook())
  },
  handleEmailAuthSubmit: (email, password, signUp, name) => {
    dispatch(actions.loginOrSignupWithEmail(email, password, signUp, name))
  },
  handleEmailAuthPasswordResetClick: (email) => {
    dispatch(actions.resetPassword(email))
  },
  handleLoginHash: (hash) => {
    dispatch(actions.receiveLoginHash(hash))
  },
  handleLoggedIn: () => {
    console.log('handling')
    dispatch(push('/'))
  }
})

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)

export default AuthContainer
