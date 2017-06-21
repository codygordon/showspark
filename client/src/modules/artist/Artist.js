import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

// import { Dimmer, Loader } from 'semantic-ui-react'
import FbPageSearch from '../fb-page-search/FbPageSearch'

import * as actions from './actions'

class ArtistContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    artist: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(actions.fetchFbToken())
  }

  componentWillReceiveProps(nextProps) {

  }

  handleFbPageSelect = (page) => {
    console.log(page)
  }

  render() {
    const { artist } = this.props
    return (
      <section className="artist-container">
        <h1>Artist</h1>
        <FbPageSearch
          fbToken={artist.fbToken}
          category="Musician/Band"
          maxLikes={10000}
          limit={300}
          placeholder="Enter your band/project name"
          onPageSelect={this.handleFbPageSelect} />
      </section>
    )
  }
}

const Artist = connect()(ArtistContainer)

export default Artist
