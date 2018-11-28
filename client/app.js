import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="body">
      <Routes />
      <img className="bg" src="https://victoriassalon.com/wp-content/uploads/2015/02/rev.jpg" />
    </div>
  )
}

export default App
