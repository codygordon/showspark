import React from 'react'
import PropTypes from 'prop-types'

const LogInButton = ({ handleClick }) => (
  <button
    className="login-button"
    onClick={handleClick}>
    Log In
  </button>
)

LogInButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default LogInButton
