import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
// import {Login} from './auth-form'
// import {me, logout} from '../store'
// import Footer from './footer'

/**
 * COMPONENT
 */

export const Search= () => {

  return (
    <div className="login">
     this is search
    </div>
  )
}
export default Search
/**
 * CONTAINER
 */

// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id,
//     isNotLoggedIn: !state.user.id,
//     email: state.user.email
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     },
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(UserHome))

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
//   handleClick: PropTypes.func.isRequired
// }
