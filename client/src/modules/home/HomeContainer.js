import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Home from './components/Home'

import * as actions from './actions'
import { logOut } from '../auth/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userProfile: state.auth.userProfile,
  ...state.home
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

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
