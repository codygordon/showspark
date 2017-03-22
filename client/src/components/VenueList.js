import React, { Component } from 'react'

import VenueCard from './VenueCard'
import VenueListPaginate from './VenueListPaginate'

export default class VenueList extends Component {
  static PropTypes = {

  }

  handlePageClick = (page) => {
    const locationText = this.props.selectedLocation.text
    const limit = this.props.venues.perPage
    const offset = Math.ceil(page.selected * this.props.venues.perPage)
    const pageNum = page.selected + 1

    this.props.history.push(`?location-text=${locationText}&page=${pageNum}`)
    this.props.pageSelectedAndRequestVenues(locationText, limit, offset, pageNum)
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
        <VenueListPaginate
          venues={this.props.venues}
          selectedLocation={this.props.selectedLocation}
          history={this.props.history}
          pageSelected={this.props.pageSelectedAndRequestVenues}
        />
        {venueCards}
      </div>
    )
  }
}
