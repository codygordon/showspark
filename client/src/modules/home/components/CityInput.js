import React from 'react'
import PropTypes from 'prop-types'

import PlacesAutocomplete from 'react-places-autocomplete'
import AutocompleteItem from './AutocompleteItem'

const CityInput = ({ cityText, handleSelect, handleChange }) => (
  <div className="city-input-container">
    <i className="fa fa-search fa-2" aria-hidden="true" />
    <PlacesAutocomplete
      inputProps={{
        value: cityText,
        onChange: handleChange,
        placeholder: 'Search venues by city',
        autoFocus: true
      }}
      onSelect={handleSelect}
      onEnterKeyDown={handleSelect}
      classNames={{ input: 'city-input' }}
      autocompleteItem={AutocompleteItem}
      highlightFirstSuggestion
      options={{
        types: ['(regions)'],
        componentRestrictions: { country: 'us' }
      }} />
  </div>
)

CityInput.defaultProps = {
  cityText: ''
}

CityInput.propTypes = {
  cityText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
}

export default CityInput
