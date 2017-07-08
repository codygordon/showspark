import React, { Component } from 'react'
import fuzzy from 'fuzzysearch'
// import PropTypes from 'prop-types'
// import qs from 'query-string'

// import GenreItem from './components/GenreItem'
// import SelectedGenres from './components/SelectedGenres'

import { musicGenres } from '../../../utils/data'

export default class FbPageSearch extends Component {
  static defaultProps = {

  }

  static propTypes = {

  }

  state = {
    filteredGenres: [],
    selectedGenres: []
  }

  handleInputChange = (e) => {
    if (e.target.value) {
      this.setState({
        filteredGenres: musicGenres.filter(genre => (
          fuzzy(e.target.value.toLowerCase(), genre.toLowerCase())
        )).sort()
      })
    } else this.setState({ filteredGenres: [] })
  }

  render() {
    return (
      <div className="fb-page-search">
        <label htmlFor="page-search-input">
          Genres
        </label>
        <input type="text" onChange={this.handleInputChange} />
      </div>
    )
  }
}
