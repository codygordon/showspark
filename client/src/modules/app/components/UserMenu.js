import React from 'react'
import PropTypes from 'prop-types'

const UserMenu = ({ handleLogOutClick }) => (
  <nav className="user-menu">
    <button onClick={handleLogOutClick}>Sign out</button>
  </nav>
)

UserMenu.propTypes = {
  handleLogOutClick: PropTypes.func.isRequired
}

export default UserMenu
