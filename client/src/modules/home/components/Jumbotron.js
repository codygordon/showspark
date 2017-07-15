import React from 'react'
import PropTypes from 'prop-types'

const Jumbotron = ({ handleCTAClick }) => (
  <section className="jumbotron">
    <h1>
      A booking agent <span className="standout">for everyone.</span>
    </h1>

    <h2>
      Join the <span className="standout">free beta</span>
      &nbsp;and we&#39;ll help you book shows with bands you&#39;ll actually like!
    </h2>
    {/* <button className="cta" onClick={handleCTAClick}>GET STARTED</button> */}
  </section>
)

Jumbotron.propTypes = {
  handleCTAClick: PropTypes.func.isRequired
}

export default Jumbotron
