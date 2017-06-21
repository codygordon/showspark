import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'query-string'

import { Dimmer, Loader } from 'semantic-ui-react'
import Info from './components/Info'
import Reviews from './components/Reviews'

import * as actions from './actions'

import placeholderImg from '../../img/venue-placeholder.jpg'

class VenueContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    region: PropTypes.object.isRequired,
    venue: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location, history, venue } = this.props
    const query = qs.parse(location.search)
    if (!query.id) history.push('/')
    if (query.id !== venue._id) dispatch(actions.fetchVenue(query.id))
  }

  componentWillReceiveProps(nextProps) {
    const venue = nextProps.venue
    if (venue.errorMessage && venue.errorMessage === 'no match') {
      this.props.history.push('/')
    }
  }

  render() {
    const { venue, city } = this.props
    let featImg = placeholderImg
    if (venue.featImg) featImg = venue.featImg
    return (
      <div className="venue-container">
        <Dimmer active={venue.isFetching}>
          <Loader size="large">
            Loading Venue...
          </Loader>
        </Dimmer>

        <section className="venue-content">
          <div
            className="venue-featured-img"
            style={{ backgroundImage: `url(${featImg})` }} />
          <h1 className="venue-title">{venue.title}</h1>
          <Info venue={venue} />
          <Reviews venue={venue} />
        </section>

        <Dimmer active={!!venue.errorMessage}>
          <h2 className="dimmer-error">{venue.errorMessage}</h2>
        </Dimmer>
      </div>
    )
  }
}

const Venue = connect()(VenueContainer)

export default Venue
