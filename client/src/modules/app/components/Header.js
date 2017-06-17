import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import LogInButton from './LogInButton'
import UserButton from './UserButton'
import UserMenu from './UserMenu'

const Header = ({ auth, handleLogOutClick, handleLogInButtonClick }) => (
  <header>
    <Link to="/" className="logo" />
    {!auth.isAuthenticated ? (
      <LogInButton handleClick={handleLogInButtonClick} />
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
  auth: PropTypes.object.isRequired,
  handleLogOutClick: PropTypes.func.isRequired,
  handleLogInButtonClick: PropTypes.func.isRequired
}

export default Header
