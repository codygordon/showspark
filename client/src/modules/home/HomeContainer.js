import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Jumbotron from './components/Jumbotron'

export default class HomeContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  handleCTAClick = () => {
    const { history } = this.props
    history.push('/artist')
  }

  render() {
    return (
      <section className="home-container">
        <Jumbotron handleCTAClick={this.handleCTAClick} />
      </section>
    )
  }
}
