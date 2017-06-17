import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'

import * as authActions from '../auth/actions'

import Header from './components/Header'
import Footer from './components/Footer'
import AuthContainer from '../auth/AuthContainer'

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
    const query = qs.parse(location.search.replace('?', ''))
    if (query.showAuth) dispatch(authActions.showAuthToggle())
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = this.props
    const query = qs.parse(location.search.replace('?', ''))
    const nextQuery = qs.parse(location.search.replace('?', ''))
    if (query.showAuth !== !nextQuery.showAuth) dispatch(authActions.showAuthToggle())
  }

  handleLoginButtonClick = () => {
    const { location, history, dispatch } = this.props
    dispatch(authActions.showAuthToggle())
    history.push(`${location.pathname}${location.search}&showAuth=true`)
  }

  handleLogOutClick = () => {
    const { dispatch } = this.props
    dispatch(authActions.logOutUser())
  }

  render() {
    const { location, history, auth, children, errorMessage, showHeader, showFooter } = this.props
    return (
      <main className="app-container">
        {showHeader &&
          <Header
            auth={auth}
            handleLogInButtonClick={this.handleLogInButtonClick}
            handleLogOutClick={this.handleLogOutClick} />
        }
        <Dimmer className="error" active={!!errorMessage}>{errorMessage}</Dimmer>
        <AuthContainer location={location} history={history} auth={auth} />
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
