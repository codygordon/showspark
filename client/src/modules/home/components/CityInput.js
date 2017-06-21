import React from 'react'
import PropTypes from 'prop-types'

import PlacesAutocomplete from 'react-places-autocomplete'
import AutocompleteItem from './AutocompleteItem'

const CityInput = ({ cityText, handleSelect, handleChange }) => (
  <div className="city-input">
    <i className="fa fa-search fa-2" aria-hidden="true" />
    <PlacesAutocomplete
      classNames={{ autocompleteContainer: 'autocomplete-container' }}
      inputProps={{
        value: cityText,
        onChange: handleChange,
        placeholder: 'Where do you want to play?',
        autoFocus: true
      }}
      onSelect={handleSelect}
      onEnterKeyDown={handleSelect}
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
