import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

import defaultAvatar from '../../../img/default-avatar.svg'

const Header = ({ location, auth, ...props }) => {
  const UserButton = (
    <div>
      {auth.profile &&
        <a className="user-button">
          <img src={auth.profile.picture || defaultAvatar} alt="user" className="avatar" />
          <span className="name">
            {auth.profile.name === auth.profile.email
              ? auth.profile.user_metadata.name : auth.profile.name}
          </span>
          <i className="fa fa-chevron-circle-down" aria-hidden="true" />
        </a>
      }
    </div>
  )

  const UserMenu = (
    <nav>
      <a role="button" tabIndex={0} onClick={props.handleLogOutClick}>Sign Out</a>
    </nav>
  )

  return (
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
        trigger={UserButton}
        content={UserMenu}
        on="click"
        position="bottom right" />
    )}
    </header>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  handleLogOutClick: PropTypes.func.isRequired
}

export default Header
