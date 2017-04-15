import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete from 'react-places-autocomplete'

import { regionSet } from '../venue-search/venueSearch'

const RegionSearch = ({ dispatch, history, region }) => {
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

  const handleSelect = (regionText) => {
    history.push(`/venue-search?region-text=${regionText}&page=1`)
  }

  const handleChange = (regionText) => {
    dispatch(regionSet(regionText, null))
  }

  return (
    <div className="region-search-container">
      <span className="region-search-icon">
        <i className="fa fa-search fa-2" aria-hidden="true" />
      </span>
      <PlacesAutocomplete
        value={region.text}
        onChange={handleChange}
        onSelect={handleSelect}
        onEnterKeyDown={handleSelect}
        classNames={{ input: 'region-search-input' }}
        autocompleteItem={AutocompleteItem}
        autofocus
        placeholder="Search venues by city"
        hideLabel
        typeAhead
        inputName="region-search-input"
        options={{
          types: ['(regions)'],
          componentRestrictions: { country: 'us' }
        }}
      />
    </div>
  )
}

RegionSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
}

export default RegionSearch
