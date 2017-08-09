import React from 'react'
import PropTypes from 'prop-types'

const Onboarding = props => (
  <section className="onboarding">
    <h1>Let{'\''}s get started!</h1>
    <h3>You{'\''}re {props.artistType.preText} {props.artistType.text}...</h3>
  </section>
)

export default Onboarding
