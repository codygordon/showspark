import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Home = props => (
  <div className="home">
    <h1>HOME!</h1>
    <Link to="/venue-search">search venues</Link>
  </div>
)

export default Home
