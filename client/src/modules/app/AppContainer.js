import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import { Dimmer } from 'semantic-ui-react'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthContainer from '../auth/AuthContainer'

import * as authActions from '../auth/actions'

class App extends Component {
  static defaultProps = {
    errorMessage: '',
    showHeader: false,
    showFooter: false
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const query = qs.parse(location.search)
    if (query.showAuth) dispatch(authActions.showAuthToggle())
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = this.props
    const query = qs.parse(location.search)
    const nextQuery = qs.parse(nextProps.location.search)
    if (query && nextQuery) {
      if ((query.showAuth && !nextQuery.showAuth)
      || (!query.showAuth && nextQuery.showAuth)) dispatch(authActions.showAuthToggle())
    }
  }

  handleLogOutClick = () => {
    const { dispatch } = this.props
    dispatch(authActions.logOutUser())
  }

  authClose = () => {
    const { location, history } = this.props
    const newSearch = location.search.replace('&showAuth=true', '').replace('?showAuth=true', '')
    history.push(`${location.pathname}${newSearch}`)
  }

  render() {
    const { location, history, auth, children, errorMessage, showHeader, showFooter } = this.props
    return (
      <main className="app-container">
        {showHeader &&
          <Header
            location={location}
            auth={auth}
            handleLogInButtonClick={this.handleLogInButtonClick}
            handleLogOutClick={this.handleLogOutClick} />
        }
        <Dimmer className="error" active={!!errorMessage}>{errorMessage}</Dimmer>
        <Dimmer
          active={auth.showingAuth}
          onClickOutside={this.authClose}>
          <AuthContainer location={location} history={history} auth={auth} />
        </Dimmer>
        {children}
        {showFooter &&
          <Footer />
        }
      </main>
    )
  }
}

const AppContainer = connect()(App)

export default AppContainer
