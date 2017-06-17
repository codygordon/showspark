import React from 'react'
import PropTypes from 'prop-types'

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div className="suggestion-item">
    <i className="fa fa-map-marker suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

AutocompleteItem.propTypes = {
  formattedSuggestion: PropTypes.string.isRequired
}

export default AutocompleteItem
