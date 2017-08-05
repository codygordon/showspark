import React from 'react'
import PropTypes from 'prop-types'

const Jumbotron = ({ handleCTAClick }) => (
  <section className="jumbotron">
    <h2>
      We{'\''}re building tools to help <span className="standout">connect the music industry</span>.
    </h2>

    <h3>
      Check back soon for more information on how you can join the <a className="standout" href="mailto:beta@showspark.com">free beta</a>!
    </h3>
    {/* <button className="cta" onClick={handleCTAClick}>GET STARTED</button> */}
  </section>
)

Jumbotron.propTypes = {
  handleCTAClick: PropTypes.func.isRequired
}

export default Jumbotron
