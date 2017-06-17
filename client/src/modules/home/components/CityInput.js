import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete from 'react-places-autocomplete'

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

const CityInput = ({ venueSearch, handleSelect, handleChange }) => (
  <div className="city-search">
    <i className="fa fa-search fa-2" aria-hidden="true" />
    <PlacesAutocomplete
      inputProps={{
        value: venueSearch.city,
        onChange: handleChange,
        placeholder: 'Search venues by city',
        autoFocus: true
      }}
      value={venueSearch.city}
      onSelect={handleSelect}
      onEnterKeyDown={handleSelect}
      classNames={{ input: 'region-search-input' }}
      autocompleteItem={AutocompleteItem}
      inputName="region-search-input"
      options={{
        types: ['(regions)'],
        componentRestrictions: { country: 'us' }
      }} />
  </div>
)

CityInput.propTypes = {
  venueSearch: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
}

export default CityInput
