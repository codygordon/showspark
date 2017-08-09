import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlacesAutocomplete from 'react-places-autocomplete'
import CitySearchItem from './components/CitySearchItem'

export default class CitySearchContainer extends Component {
  static propTypes = {
    handleCitySelect: PropTypes.func.isRequired
  }

  state = {
    cityText: ''
  }

  handleCityInputChange = (cityText) => {
    this.setState({ cityText })
  }

  handleCityInputSelect = (cityText) => {
    const city = cityText.replace(', United States', '')
    this.setState({ cityText: '' })
    this.props.handleCitySelect(city)
  }

  render() {
    return (
      <div className="city-search-container">
        <PlacesAutocomplete
          classNames={{ autocompleteContainer: 'items-container' }}
          inputProps={{
            value: this.state.cityText,
            onChange: this.handleCityInputChange,
            placeholder: 'Where do you want to play?',
            autoFocus: true
          }}
          onSelect={this.handleCityInputSelect}
          onEnterKeyDown={this.handleCityInputSelect}
          autocompleteItem={CitySearchItem}
          highlightFirstSuggestion
          options={{
            types: ['(regions)'],
            componentRestrictions: { country: 'us' }
          }} />
      </div>
    )
  }
}
