import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import queryString from 'query-string'

import '../venue.css'

import placeholderImg from '../../../img/venue-placeholder.jpeg'

import VenuesHeader from '../../shared-components/VenuesHeader'
import Title from '../components/Title'
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
          <Title title={venue.title} featImg={featImg} />
          <Info
            address={venue.address}
            capacity={venue.capacity}
            genres={venue.genres}
          />
          {venue.reviews && <Reviews reviews={venue.reviews} />}
        </section>

        <Dimmer active={!!venue.errorMessage}>
          <h2 className="dimmer-error">{venue.errorMessage}</h2>
        </Dimmer>
      </div>
    )
  }
}
