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
function mapState(state) {
  return {
    reservation: state.reservation
  }
}
function mapDispatch(dispatch) {
  return {
    fetchReservation: id => dispatch(getDetails(id))
  }
}


class MyQs extends React.Component {
  render() {
    return <div className="insideFrame">My Q</div>
  }
}
export default connect(mapState, mapDispatch)(MyQs)
