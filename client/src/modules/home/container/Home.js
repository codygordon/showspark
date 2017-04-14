import React from 'react'
import { connect } from 'react-redux'

import '../home.css'

import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'
import Footer from '../components/Footer'

const HomeContainer = props => (
  <div className="home">
    <Header />
    <Jumbotron
      history={props.history}
      region={props.region}
      dispatch={props.dispatch}
    />
    <Footer />
  </div>
)

const Home = connect()(HomeContainer)

export default Home
