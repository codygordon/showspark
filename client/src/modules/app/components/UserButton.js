import React from 'react'
import PropTypes from 'prop-types'

import defaultAvatar from '../../../img/default-avatar.svg'

const UserButton = ({ profile }) => (
  <div className="user-button">
    <img src={profile.picture || defaultAvatar} alt="user" className="avatar" />
    <span className="name">{profile.name}</span>
    <i className="fa fa-chevron-circle-down" aria-hidden="true" />
  </div>
)

UserButton.propTypes = {
  profile: PropTypes.object.isRequired
}

export default UserButton
