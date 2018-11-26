import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Search,
  QRcode,
  Qsetting,
  myQs,
  Qdata,
  favorites,
  profile,
  MyBusinesses,
  MyBusinessDetail,
  MapContainer,
  BusinessList,
  Categories,
  SingleView,
  Video
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/map" component={MapContainer} />
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
        <Route path="/signup" component={Signup} />
        <Route path="/QRcode" component={QRcode} />
        <Route path="/home" component={UserHome} />
        <Route path="/Qsetting" component={Qsetting} />
        <Route path="/myQs" component={myQs} />
        <Route path="/business/:id" component={SingleView} />
        <Route path="/Qdata" component={Qdata} />

        <Route path="/categories" component={Categories} />
        <Route path="/businessList" component={BusinessList} />
        <Route path="/search" component={Search} />
        <Route exact path="/video" component={Video} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/my-businesses/:businessId"
              component={MyBusinessDetail}
            />
            <Route path="/my-businesses/" component={MyBusinesses} />
            <Route path="/favorites" component={favorites} />
            <Route path="/profile" component={profile} />
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
