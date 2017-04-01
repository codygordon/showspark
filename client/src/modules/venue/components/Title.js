import React from 'react'

const Title = ({ title, featImg }) => (
  <div
    className="venue-featured-img"
    style={{ backgroundImage: `url(${featImg})` }}
  >
    <h1 className="venue-title">{title}</h1>
  </div>
)

export default Title
