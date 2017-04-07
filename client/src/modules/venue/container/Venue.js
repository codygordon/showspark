import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import '../venue.css'

import placeholderImg from '../../../img/venue-placeholder.jpeg'

import VenuesHeader from '../../shared-components/VenuesHeader'
import Info from '../components/Info'
import Reviews from '../components/Reviews'

export default class Venue extends Component {
  static PropTypes = {

  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search)
    if (!query.id) this.props.history.push('/')
    if (query.id !== this.props.venue._id) this.props.fetchVenue(query.id)
  }

  componentWillReceiveProps(nextProps) {
    const venue = nextProps.venue
    if (venue.errorMessage && venue.errorMessage === 'no match') {
      this.props.history.push('/')
    }
  }

  render() {
    const { history, venue, region } = this.props
    let featImg = placeholderImg
    if (venue.featImg) featImg = venue.featImg
    return (
      <div className="venue-container">
        <VenuesHeader
          history={history}
          region={region}
          regionSet={this.props.regionSet}
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
          <Reviews venue={venue} />
        </section>

        <Dimmer active={!!venue.errorMessage}>
          <h2 className="dimmer-error">{venue.errorMessage}</h2>
        </Dimmer>
      </div>
    )
  }
}
