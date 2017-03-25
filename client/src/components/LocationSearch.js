import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

import googleLogo from '../img/powered_by_google_on_white_hdpi.png'

export default class LocationSearch extends Component {
  handleSelect = (location) => {
    this.props.history.push(`?location-text=${location}&page=1`)
  }

  handleChange = (location) => {
    this.props.locationSelected(location, this.props.selectedLocation.coords)
  }

  render() {
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="suggestion-item">
        <i className="fa fa-map-marker suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
        <img style={{ visibility: 'hidden' }} className="powered-by-google" src={googleLogo} alt="powered by google" />
      </div>
    )

    return (
      <div className="location-search-container">
        <span className="location-search-icon">
          <i className="fa fa-search fa-2" aria-hidden="true" />
        </span>
        <PlacesAutocomplete
          value={this.props.selectedLocation.text}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          classNames={{ input: 'location-search-input' }}
          autocompleteItem={AutocompleteItem}
          placeholder="Search by city"
          hideLabel
          typeAhead
          inputName="location-search-input"
          options={{
            types: ['(regions)'],
            componentRestrictions: { country: 'us' }
          }}
        />
      </div>
    )
  }
}
