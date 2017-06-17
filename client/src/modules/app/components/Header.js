import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import LogInButton from './LogInButton'

import avatar from '../../../img/default-avatar.svg'

const Header = ({ auth, handleLogOutClick, handleLogInButtonClick }) => {
  const headerUser = (
    <div className="user">
      <img src={auth.profile.picture || avatar} alt="user" className="avatar" />
      <span className="name">{auth.profile.name}</span>
      <i className="fa fa-chevron-circle-down" aria-hidden="true" />
    </div>
  )

  const userMenu = (
    <div>
      <button onClick={handleLogOutClick}>Sign out</button>
    </div>
  )

  return (
    <header>
      <Link to="/" className="logo" />
      {!auth.isAuthenticated ? (
        <LogInButton handleClick={handleLogInButtonClick} />
      ) : (
        <Popup
          className="user-menu"
          trigger={headerUser}
          content={userMenu}
          hoverable
          position="bottom right" />
      )}
    </header>
  )
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  handleLogOutClick: PropTypes.func.isRequired,
  handleLogInButtonClick: PropTypes.func.isRequired
}

export default Header
