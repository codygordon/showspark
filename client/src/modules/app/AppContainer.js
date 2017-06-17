import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import { Dimmer, Modal } from 'semantic-ui-react'
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
    const nextQuery = qs.parse(location.search)
    if (query.showAuth !== !nextQuery.showAuth) dispatch(authActions.showAuthToggle())
  }

  handleLogInButtonClick = () => {
    const { location, history, dispatch } = this.props
    dispatch(authActions.showAuthToggle())
    const authParam = location.search ? '&showAuth=true' : '?showAuth=true'
    history.push(`${location.pathname}${location.search}${authParam}`)
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
        <Modal
          basic
          open={auth.showingAuth}
          onClose={this.authClose}>
          <AuthContainer location={location} history={history} auth={auth} />
        </Modal>
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
