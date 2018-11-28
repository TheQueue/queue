import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
<nav className="navbar is-link is-fixed-bottom" role="navigation">
<link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossOrigin="anonymous"
      />
        <Link to="/search" className="navbar-item is-expanded is-block has-text-centered">
            <i className="fa fa-search"></i>
            <p className="is-size-7">Search</p>
        </Link>
       <Link to="/myQs" className="navbar-item is-expanded is-block has-text-centered">
            <i className="fa fa-hourglass"></i>
            <p className="is-size-7">Qs</p>
        </Link>
        <Link to="/search" className="navbar-item is-expanded is-block has-text-centered">
            <i className="fa fa-user-circle"></i>
            <p className="is-size-7">Profile</p>
        </Link>
        <Link to="/search" className="navbar-item is-expanded is-block has-text-centered">
            <i className="fa fa-heart"></i>
            <p className="is-size-7">Favorite</p>
        </Link>

</nav>
  )
}
export default Footer
