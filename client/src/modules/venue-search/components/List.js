import React from 'react'

import Card from './Card'
import ListPaginate from './ListPaginate'

const List = (props) => {
  const handleCardClick = (venue) => {
    props.venueSelected(venue)
    props.history.push(`/venue?id=${venue._id}`)
  }

  const cards = props.venues.data.map((venue, i) => (
    <Card
      key={venue._id}
      index={i}
      venue={venue}
      listCardHover={props.listCardHover}
      handleCardClick={handleCardClick}
    />
  ))

  return (
    <section className="venue-list-container">
      <ListPaginate
        history={props.history}
        venues={props.venues}
        region={props.region}
      />
      {cards}
      <ListPaginate
        history={props.history}
        venues={props.venues}
        region={props.region}
      />
    </section>
  )
}

export default List
