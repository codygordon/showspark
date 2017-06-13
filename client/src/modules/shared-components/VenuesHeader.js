import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { showAuth, closeAuth } from '../auth/auth'

import RegionSearch from './RegionSearch'
import AuthContainer from '../auth/AuthContainer'

export default class VenuesHeader extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    region: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const query = queryString.parse(location.search)
    if (query.showAuth) {
      dispatch(showAuth())
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location, auth } = this.props
    const query = queryString.parse(location.search)
    const nextQuery = queryString.parse(nextProps.location.search)
    if (!auth.showingAuth && (query.showAuth || nextQuery.showAuth)) {
      dispatch(showAuth())
    } else if (auth.showingAuth && !nextQuery.showAuth) {
      dispatch(closeAuth())
    }
  }

  handleLogInClick = () => {
    const { history, auth } = this.props
    if (!auth.showingAuth) {
      history.push(`${location.pathname}${location.search}&showAuth=true`)
    }
  }

  render() {
    const { dispatch, history, location, auth, region } = this.props
    return (
      <header className="venues-header">
        <Link to="/" className="header-logo" />

        <div className="venues-region-search">
          <RegionSearch
            dispatch={dispatch}
            history={history}
            region={region}
          />
        </div>

        {auth.isAuthenticated ? (
          <div className="venues-header-logged-in">Logged IN!</div>
        ) : (
          <div className="venues-header-auth">
            <button
              className="button login-button"
              onClick={this.handleLogInClick}
            >Log In</button>
            <AuthContainer location={location} history={history} auth={auth} />
          </div>
        )}
      </header>
    )
  }
}
