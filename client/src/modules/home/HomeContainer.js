import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './home.css'

import Header from './components/Header'
import Jumbotron from './components/Jumbotron'
import Footer from './components/Footer'

const Home = props => (
  <div className="home">
    <Header />
    <Jumbotron
      dispatch={props.dispatch}
      history={props.history}
      region={props.region}
    />
    <Footer />
  </div>
)

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired
}

const HomeContainer = connect()(Home)

export default HomeContainer
