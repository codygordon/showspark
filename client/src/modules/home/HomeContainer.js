import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'
import slug from 'slug'

import Jumbotron from './components/Jumbotron'
import CityInput from './components/CityInput'

import * as venueSearchActions from '../venue-search/actions'

class Home extends Component {
  handleCityInputChange = (cityText) => {
    const { dispatch } = this.props
    dispatch(venueSearchActions.receiveCityText(cityText))
  }

  handleCityInputSelect = (fullText) => {
    const { dispatch, history } = this.props
    const cityText = fullText.replace(', United States', '').trim()
    dispatch(venueSearchActions.receiveCityText(cityText))
    dispatch(venueSearchActions.citySelected(slug(cityText)))
    history.push(`/venue-search?${qs.stringify({ city: slug(cityText) })}`)
  }

  render() {
    const { city } = this.props.venueSearch
    return (
      <section className="home-container">
        <Jumbotron />
        <CityInput
          cityText={city.text}
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
