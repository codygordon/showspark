import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import UserButton from './UserButton'
import UserMenu from './UserMenu'

const Header = ({ location, auth, handleLogOutClick }) => (
  <header>
    <Link to="/" className="logo" />
    {!auth.isAuthenticated ? (
      <Link
        className="log-in"
        to={{
          pathname: location.pathname,
          search: location.search ? `${location.search}&showAuth=true` : '?showAuth=true'
        }}>
        Log In
      </Link>
    ) : (
      <Popup
        className="user-menu"
        trigger={(
          <UserButton profile={auth.profile} />
        )}
        content={(
          <UserMenu
            handleLogOutClick={handleLogOutClick} />
        )}
        hoverable
        position="bottom right" />
    )}
  </header>
)

Header.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  handleLogOutClick: PropTypes.func.isRequired
}

export default Header
