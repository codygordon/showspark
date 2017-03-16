import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

import API from '../utils/API'

import Header from '../components/Header'
// import Map from './Map'

export default class App extends Component {
  static propTypes = {

  }

  componentWillMount() {
    API.get('', (res) => console.log(res))
  }

  render() {
    let loading;
    return (
      <div className="app">
        <Dimmer className={loading}>
          <Loader size="large">&nbsp;</Loader>
        </Dimmer>
        <Header />
      </div>
    )
  }
}
