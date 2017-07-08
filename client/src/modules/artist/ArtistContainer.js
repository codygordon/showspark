import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import qs from 'query-string'

// import { Dimmer, Loader } from 'semantic-ui-react'
import FbPageSearchContainer from '../fb-page-search/FbPageSearchContainer'
import GenreSelector from './components/GenreSelector'

import { fbPageFields } from '../../utils/data'
import apiCall from '../../utils/api-call'

export default class ArtistContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {
    fbToken: '',
    fbPage: null
  }

  async componentWillMount() {
    try {
      const res = await apiCall({ dataType: 'fb-token' })
      this.setState({ fbToken: res.token })
    } catch (err) { this.setState({ errorMessage: err.message }) }
  }

  componentWillReceiveProps(nextProps) {

  }

  handleFbPageSelect = (page) => {
    this.setState({ fbPage: page })
  }

  render() {
    const { fbToken, fbPage } = this.state
    const { isAuthenticated } = this.props
    return (
      <section className="artist-container">
        {fbPage &&
          <div>
            <h2>{fbPage.name}</h2>
            <h3>Hometown: {fbPage.hometown}</h3>
          </div>
        }
        <FbPageSearchContainer
          fbToken={fbToken}
          category="Musician/Band"
          maxLikes={10000}
          limit={100}
          placeholder="Enter your band/project name"
          pageFields={fbPageFields}
          onPageSelect={this.handleFbPageSelect} />
        <GenreSelector />
        {/* INFLUENCES FB PAGE SEARCH */}
        {/* CITIES TO PLAY SEARCH */}
      </section>
    )
  }
}
