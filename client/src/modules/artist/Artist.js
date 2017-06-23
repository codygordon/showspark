import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import qs from 'query-string'

// import { Dimmer, Loader } from 'semantic-ui-react'
import FbPageSearch from '../fb-page-search/FbPageSearch'

import * as actions from './actions'

const fbPageFields = ['id', 'username', 'name', 'category', 'fan_count',
  'picture', 'events', 'about', 'emails', 'artists_we_like', 'website',
  'band_interests', 'band_members', 'general_manager', 'booking_agent',
  'press_contact', 'bio', 'hometown', 'influences', 'record_label']

class ArtistContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // location: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    artist: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(actions.fetchFbToken())
  }

  componentWillReceiveProps(nextProps) {

  }

  handleFbPageSelect = (page) => {
    const { dispatch } = this.props
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
          limit={50}
          placeholder="Enter your band/project name"
          pageFields={fbPageFields}
          onPageSelect={this.handleFbPageSelect} />
      </section>
    )
  }
}

const Artist = connect()(ArtistContainer)

export default Artist
