import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Onboarding from './components/Onboarding'

import * as actions from './actions'
import { logOut } from '../auth/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userProfile: state.auth.userProfile,
  artistType: state.home.artistType,
  ...state.onboarding
})

const mapDispatchToProps = dispatch => ({
  handleLoginClick: () => {
    dispatch(push('/login'))
  },
  handleLogOutClick: () => {
    dispatch(logOut())
  },
  handleArtistType: (e) => {
    dispatch(actions.setArtistType(JSON.parse(e.target.value)))
  },
  handleCTASubmit: (e) => {
    e.preventDefault()
    dispatch(push('/onboarding'))
  }
})

const OnboardingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding)

export default OnboardingContainer
