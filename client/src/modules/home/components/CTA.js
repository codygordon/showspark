import React from 'react'
import PropTypes from 'prop-types'

import CTAHeading from './CTAHeading'
import CTAForm from './CTAForm'

const CTA = ({ handleArtistType, handleCTASubmit, ...props }) => (
  <section className="cta">
    <CTAHeading />
    <CTAForm
      handleArtistType={handleArtistType}
      handleCTASubmit={handleCTASubmit}
      artistType={props.artistType} />
  </section>
)

export default CTA
