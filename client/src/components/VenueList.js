import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'

import VenueCard from './VenueCard'

export default class VenueList extends Component {
  static PropTypes = {

  }

  render() {
    const venueCards = this.props.venues.data.map((venue, i) => (
      <VenueCard
        key={venue._id}
        index={i}
        venue={venue}
        venueListCardHover={this.props.venueListCardHover}
      />
    ))

    return (
      <div className="venue-list-container">
        {venueCards}
      </div>
    )
  }
}
