import React from 'react'
import PropTypes from 'prop-types'

const CitySearchItem = ({ formattedSuggestion }) => (
  <a className="city-search-item">
    <i className="fa fa-map-marker suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </a>
)

CitySearchItem.propTypes = {
  formattedSuggestion: PropTypes.string.isRequired
}

export default CitySearchItem
