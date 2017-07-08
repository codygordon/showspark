import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

import defaultAvatar from '../../../img/default-avatar.svg'

const Header = (props) => {
  const UserButton = (
    <div>
      {props.userProfile &&
        <a className="user-button">
          <img src={props.userProfile.picture || defaultAvatar} alt="user" className="avatar" />
          <span className="name">
            {props.userProfile.name === props.userProfile.email
              ? props.userProfile.user_metadata.name : props.userProfile.name}
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
      {!props.isAuthenticated ? (
        <Link
          className="log-in"
          to={{
            pathname: props.location.pathname,
            search: props.location.search ? `${props.location.search}&showAuth=true` : '?showAuth=true'
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
  userProfile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogOutClick: PropTypes.func.isRequired
}

export default Header
