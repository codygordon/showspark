import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import CTA from './CTA'

const Home = props => (
  <section className="home">
    <Header />
    <CTA
      handleArtistType={props.handleArtistType}
      handleCTASubmit={props.handleCTASubmit}
      artistType={props.artistType} />
  </section>
)

export default Home
