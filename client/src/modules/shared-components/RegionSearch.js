import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

import googleLogo from '../../img/powered_by_google_on_white_hdpi.png'

const RegionSearch = (props) => {
  const AutocompleteItem = ({ formattedSuggestion }) => (
    <div className="suggestion-item">
      <i className="fa fa-map-marker suggestion-icon" />
      <strong>{formattedSuggestion.mainText}</strong>{' '}
      <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      <img style={{ visibility: 'hidden' }} className="powered-by-google" src={googleLogo} alt="powered by google" />
    </div>
  )

  const handleSelect = (regionText) => {
    props.history.push(`/venue-search?region-text=${regionText}&page=1`)
  }

  const handleChange = (regionText) => {
    props.regionSet(regionText, null)
  }

  return (
    <div className="region-search-container">
      <span className="region-search-icon">
        <i className="fa fa-search fa-2" aria-hidden="true" />
      </span>
      <PlacesAutocomplete
        value={props.region.text}
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

export default RegionSearch
