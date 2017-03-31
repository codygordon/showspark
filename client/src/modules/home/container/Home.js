import React from 'react'

import '../home.css'

import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'
import Footer from '../components/Footer'

const Home = props => (
  <div className="home">
    <Header />
    <Jumbotron
      history={props.history}
      region={props.region}
      regionSet={props.regionSet}
    />
    <Footer />
  </div>
)

export default Home
