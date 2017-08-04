import React from 'react'
import PropTypes from 'prop-types'

const Jumbotron = ({ handleCTAClick }) => (
  <section className="jumbotron">
    <h2>
      We{'\''}re building tools to help you manage your artists more effectively and&nbsp;
      <span className="standout">get paid faster</span>.
    </h2>

    <h3>
      To join the <span className="standout">free beta</span> just send us&nbsp;
      an email to <a href="mailto:beta@showspark.com" className="standout">beta@showspark.com</a>
      &nbsp;and we{'\''}ll get back to you with details right away!
    </h3>
    {/* <button className="cta" onClick={handleCTAClick}>GET STARTED</button> */}
  </section>
)

Jumbotron.propTypes = {
  handleCTAClick: PropTypes.func.isRequired
}

export default Jumbotron
