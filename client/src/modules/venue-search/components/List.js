import React from 'react'

import { venueSelected } from '../../venue/venue'

import Card from './Card'
import ListPaginate from './ListPaginate'

const List = (props) => {
  const { dispatch, history, region, venues } = props

  const handleCardClick = (venue) => {
    dispatch(venueSelected(venue))
    history.push(`/venue?id=${venue._id}`)
  }

  const cards = venues.data.map(venue => (
    <Card
      key={venue._id}
      dispatch={dispatch}
      venue={venue}
      handleCardClick={handleCardClick}
    />
  ))

  const pagination = (
    <ListPaginate
      history={history}
      venues={venues}
      region={region}
    />
  )

  return (
    <section className="venue-list-container">
      {pagination}
      {cards}
      {pagination}
    </section>
  )
}

export default List
