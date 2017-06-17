import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import * as venueSearchActions from '../venue-search/actions'

import HomeHeading from './components/HomeHeading'
import CityInput from './components/CityInput'

class Home extends Component {
  handleCityInputChange = (cityText) => {
    const { dispatch } = this.props
    dispatch(venueSearchActions.receiveCity(cityText, null))
  }

  handleCityInputSelect = (cityText) => {
    const { dispatch, history } = this.props
    dispatch(venueSearchActions.citySelected(cityText))
    history.push(`/venue-search?${qs.stringify({ city: cityText })}`)
  }

  render() {
    const { city } = this.props.venueSearch
    return (
      <section className="home-container">
        <HomeHeading />
        <CityInput
          city={city}
          handleChange={this.handleCityInputChange}
          handleSelect={this.handleCityInputSelect} />
      </section>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  venueSearch: PropTypes.object.isRequired
}

const HomeContainer = connect()(Home)

export default HomeContainer
