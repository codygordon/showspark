import React, { Component } from 'react'
import PropTypes from 'prop-types'
import slug from 'slug'
// import qs from 'query-string'

// import { Dimmer, Loader } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import FbPageSearch from './components/FbPageSearch'

import { fbPageFields, musicGenres } from '../../utils/data'
import apiCall from '../../utils/api-call'

export default class ArtistContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {
    fbToken: '',
    fbPage: null,
    influences: [],
    cities: []
  }

  async componentWillMount() {
    try {
      const res = await apiCall({ dataType: 'fb-token' })
      this.setState({ fbToken: res.token })
    } catch (err) { this.setState({ errorMessage: err.message }) }
  }

  componentWillReceiveProps(nextProps) {

  }

  handleArtistFbPageSelect = (page) => {
    this.setState({ fbPage: page })
  }

  handleInfluenceFbPageSelect = (page) => {
    const found = this.state.influences.find(infl => (infl.name === page.name))
    if (!found) {
      this.setState({
        influences: [...this.state.influences, {
          fbPageId: page.id,
          pictureUrl: page.picture.data.url,
          name: page.name
        }]
      })
    }
  }

  handleGenreChange = (e, data) => {
    this.setState({ genres: data.value })
  }

  handleCitySearchSelect = (city) => {
    this.setState({ cities: [...this.state.cities, city] })
  }

  render() {
    const { fbToken, fbPage } = this.state
    return (
      <section className="artist-container">
        {fbPage &&
          <div>
            <h2>{fbPage.name}</h2>
            <h3>Hometown: {fbPage.hometown}</h3>
          </div>
        }
        <FbPageSearch
          addClass="artist"
          fbToken={fbToken}
          category="Musician/Band"
          maxLikes={10000}
          limit={100}
          placeholder="Enter your band/project name"
          pageFields={fbPageFields}
          onPageSelect={this.handleArtistFbPageSelect} />
        <Dropdown
          className="genre-selector"
          multiple
          search
          selection
          options={musicGenres.map(genre => (
            { key: slug(genre), text: genre, value: slug(genre) }
          ))}
          onChange={this.handleGenreChange} />
        {/* CONTAINER FOR SELECTED GENRES */}
        <FbPageSearch
          addClass="artist"
          fbToken={fbToken}
          category="Musician/Band"
          minLikes={2000}
          placeholder="Enter an influence"
          pageFields={fbPageFields}
          onPageSelect={this.handleInfluenceFbPageSelect} />
        <div className="selected-influences">
          {this.state.influences.map(influence => (
            <div className="influence-item">
              <img src={influence.pictureUrl} alt="" />
              <span className="name">{influence.name}</span>
            </div>
          ))}
        </div>

        {/* CONTAINER FOR SELECTED CITIES */}
      </section>
    )
  }
}
