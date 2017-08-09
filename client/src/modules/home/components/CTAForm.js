import React from 'react'
import PropTypes from 'prop-types'

import { artistTypes } from '../../../utils/data'

const CTAForm = ({ handleArtistType, handleCTASubmit, ...props }) => (
  <form id="cta-form" className="cta-form">
    You are&nbsp;
    <label>
      <span className="input-overlay">{props.artistType.preText} {props.artistType.text}</span>
      <select
        form="cta-form"
        name="artist-type"
        onChange={handleArtistType}>
        {artistTypes.map(artistType => (
          <option key={artistType.key} value={JSON.stringify(artistType)}>
            {artistType.preText} {artistType.text}
          </option>
        ))}
      </select>
    </label>
    <button type="submit" onClick={handleCTASubmit}>Get Started</button>
  </form>
)

export default CTAForm
