import React from 'react'

import { Dimmer, Loader } from 'semantic-ui-react'

const LoginInterstitial = () => (
  <section className="login-interstitial">
    <Dimmer active><Loader size="large">Logging in...</Loader></Dimmer>
  </section>
)

export default LoginInterstitial
