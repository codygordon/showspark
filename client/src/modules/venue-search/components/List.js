import React, { Component } from 'react'

import Card from './Card'
import ListPaginate from './ListPaginate'

export default class List extends Component {
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
    const cards = this.props.venues.data.map((venue, i) => (
      <Card
        key={venue._id}
        index={i}
        venue={venue}
        listCardHover={this.props.listCardHover}
      />
    ))

    return (
      <section className="venue-list-container">
        <ListPaginate
          venues={this.props.venues}
          selectedLocation={this.props.selectedLocation}
          history={this.props.history}
          pageSelected={this.props.pageSelectedAndRequestVenues}
        />
        {cards}
      </section>
    )
  }
}
