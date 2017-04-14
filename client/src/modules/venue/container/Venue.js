import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import '../venue.css'

import placeholderImg from '../../../img/venue-placeholder.jpeg'

import { fetchVenue } from '../venue'

import VenuesHeader from '../../shared-components/VenuesHeader'
import Info from '../components/Info'
import Reviews from '../components/Reviews'

class VenueContainer extends Component {
  static PropTypes = {

  }

  componentWillMount() {
    const { dispatch, location, history, venue } = this.props
    const query = queryString.parse(location.search)
    if (!query.id) history.push('/')
    if (query.id !== venue._id) dispatch(fetchVenue(query.id))
  }

  componentWillReceiveProps(nextProps) {
    const venue = nextProps.venue
    if (venue.errorMessage && venue.errorMessage === 'no match') {
      this.props.history.push('/')
    }
  }

  render() {
    const { dispatch, history, auth, venue, region } = this.props
    let featImg = placeholderImg
    if (venue.featImg) featImg = venue.featImg
    return (
      <div className="venue-container">
        <VenuesHeader
          dispatch={dispatch}
          history={history}
          auth={auth}
          region={region}
        />

        <Dimmer active={venue.isFetching}>
          <Loader size="large">
            Loading Venue...
          </Loader>
        </Dimmer>

        <section className="venue-content">
          <div
            className="venue-featured-img"
            style={{ backgroundImage: `url(${featImg})` }}
          />
          <h1 className="venue-title">{venue.title}</h1>
          <Info venue={venue} />
          <Reviews dispatch={dispatch} venue={venue} />
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
