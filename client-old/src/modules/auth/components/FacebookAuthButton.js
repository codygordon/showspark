import React from 'react'
import PropTypes from 'prop-types'

const FacebookAuthButton = ({ handleClick }) => (
  <button
    className="facebook-auth-button"
    onClick={handleClick}>
    <i className="fa fa-facebook-official" aria-hidden="true" />
    Log in with Facebook
  </button>
)

FacebookAuthButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default FacebookAuthButton
