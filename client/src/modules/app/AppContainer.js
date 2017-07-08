import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import qs from 'query-string'

import { CSSTransitionGroup } from 'react-transition-group'
import { Dimmer } from 'semantic-ui-react'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthContainer from '../auth/AuthContainer'
import HomeContainer from '../home/HomeContainer'
import ArtistContainer from '../artist/ArtistContainer'
// import Admin from './modules/artist/Admin'
import LoginInterstitial from './components/LoginInterstitial'
import NotFound from './components/NotFound'

import AuthService from '../../utils/auth-service'

const auth0 = new AuthService()

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    isAuthenticated: auth0.loggedIn(),
    userProfile: auth0.getProfile(),
    showAuth: false
  }

  componentWillMount() {
    const { location, history } = this.props
    const query = qs.parse(location.search)

    if (location.pathname === '/login') {
      history.replace(`${location.pathname}?showAuth=true`)
      auth0.parseHash(location.hash, (err) => {
        if (err) console.error(err) // TODO: handle this
      })
      // HACK: goes back to location where auth was opened
      setTimeout(() => { history.goBack() }, 500)
    }

    if (query.showAuth) {
      this.setState({ showAuth: true })
      if (this.state.isAuthenticated) {
        const newSearch = location.search
          .replace('&showAuth=true', '').replace('?showAuth=true', '')
        history.replace(`${location.pathname}${newSearch}`)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props
    const query = qs.parse(location.search)
    const nextQuery = qs.parse(nextProps.location.search)
    if (query && nextQuery) {
      if ((query.showAuth && !nextQuery.showAuth)
      || (!query.showAuth && nextQuery.showAuth)) {
        this.setState({ showAuth: !this.state.showAuth })
      }
    }
  }

  handleLogOutClick = () => {
    auth0.logout()
    this.setState({ isAuthenticated: false })
  }

  authClose = () => {
    const { location, history } = this.props
    const newSearch = location.search
      .replace('&showAuth=true', '').replace('?showAuth=true', '')
    history.push(`${location.pathname}${newSearch}`)
  }

  HomePlusProps = () => (
    <HomeContainer
      history={this.props.history}
      isAuthenticated={this.state.isAuthenticated} />
  )

  ArtistPlusProps = () => (
    <ArtistContainer
      history={this.props.history}
      isAuthenticated={this.state.isAuthenticated} />
  )

  render() {
    const { location, history } = this.props
    return (
      <main className="app-container">
        <Header
          isAuthenticated={this.state.isAuthenticated}
          userProfile={this.state.userProfile}
          location={location}
          handleLogInButtonClick={this.handleLogInButtonClick}
          handleLogOutClick={this.handleLogOutClick} />
        <Dimmer
          active={this.state.showAuth}
          onClickOutside={this.authClose}>
          <CSSTransitionGroup
            transitionName="auth"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={100}>
            {this.state.showAuth &&
              <AuthContainer location={location} history={history} />
            }
          </CSSTransitionGroup>
        </Dimmer>

        <Switch>
          <Route exact match path="/" render={this.HomePlusProps} />
          <Route path="/artist" render={this.ArtistPlusProps} />
          <Route path="/login" render={LoginInterstitial} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </main>
    )
  }
}

const AppContainer = withRouter(App)

export default AppContainer
