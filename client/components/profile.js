import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetails} from '../store/business'
import {me} from '../store'
import Navbar from './navbar/navbarMain'
import PropTypes from 'prop-types'
import Footer from './footer'
import moment from 'moment'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      partySize: 1,
      note: '',
      doneReserve: false
    }
  }

  render() {
    const {email, user} = this.props
    console.log(user)
    return (
      <div>
        <Navbar />

        <div className="insideFrame has-text-centered">
          <div className="card is-centered">
            <div className="card-image has-text-centered is-centered">
              <figure className="image is-128x128 is-centered">
                <img
                  className="is-rounded"
                  src="http://thehivedaily.com/wp-content/uploads/2018/09/crazy-hairstyles-cool-for-hair-day-hairstyle-tattoo.jpg"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left" />
                <div className="media-content">
                  <p className="title is-4">{user.username}</p>
                  <p className="subtitle is-6">{user.email}</p>
                  <p className="subtitle is-6">{user.phoneNumber}</p>
                </div>
              </div>

              <div className="content">
                I love to have werid hair style, and I love this app.
                <br />
                <a>#animalstyle </a>
                <a href="#">#longhair</a> <a href="#">#horseonhead</a>
                <br />
                <p>
                  Joined since: {moment(user.createdAt).format('MMM Do YY')}
                </p>
              </div>
              <div className="content has-text-centered">
                <strong> Images</strong>
                <figure className="image is-128x128 has-text-centered">
                  <img
                    className="is-rounded"
                    src="https://i.pinimg.com/236x/08/ca/5e/08ca5e97a69b1ddcf074063eeba304ef--crazy-hairstyles-unique-hairstyles.jpg"
                    alt="Placeholder image"
                  />
                </figure>

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
function mapState(state) {
  return {
    user: state.user,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)

Profile.propTypes = {
  email: PropTypes.string
}
