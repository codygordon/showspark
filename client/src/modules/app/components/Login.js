import React from 'react'

import { Dimmer, Loader } from 'semantic-ui-react'

const Login = () => (
  <section className="login">
    <Dimmer active><Loader size="large">Logging in...</Loader></Dimmer>
  </section>
)

export default Login
