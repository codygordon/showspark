import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

export default class LocationSearch extends Component {
  handleSelect = (location) => {
    this.props.locationSelected(location)
  }

  render() {
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="suggestion-item">
        <i className="fa fa-map-marker suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>
    )

    if (this.props.selectedLocation) console.log(this.props.selectedLocation)

    const searchValue = this.props.selectedLocation || this.locationSearch

    return (
      <div className="location-search-container">
        <PlacesAutocomplete
          value={this.props.selectedLocation}
          onChange={(input) => { this.locationSearch = input }}
          onSelect={this.handleSelect}
          classNames={{ input: 'location-search-input' }}
          autocompleteItem={AutocompleteItem}
          placeholder="Search by City"
          hideLabel
          inputName="location-search-input"
          options={{ types: ['(cities)'] }}
        />
      </div>
    )
  }
}
