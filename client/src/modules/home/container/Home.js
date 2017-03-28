import React, { Component } from 'react'

import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'
import Footer from '../components/Footer'

const Home = props => (
  <div className="home">
    <Header />
    <Jumbotron
      history={props.history}
      location={props.location}
      venues={props.venues}
      selectedLocation={props.selectedLocation}
      locationSelectedAndRequestVenues={props.locationSelectedAndRequestVenues}
      locationSelected={props.locationSelected}
    />
    <Footer />
  </div>
)

export default Home
