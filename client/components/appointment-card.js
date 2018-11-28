import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSingleAppointmentThunk} from '../store'
import moment from 'moment'

class AppointmentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleCancel = event => {
    event.preventDefault()
    const apptId = event.target.name
    this.props.updateSingleAppointmentThunk(apptId, 'cancel')
  }

  handleService = event => {
    event.preventDefault()
    const apptId = event.target.name
    this.props.updateSingleAppointmentThunk(apptId, 'service')
  }

  // converts dateandtime value from sequelize -> Date object
  parseISOString(s) {
    var b = s.split(/\D+/)
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
  }

  render() {
    const {appointment, slot, user, stylist} = this.props
    const handleCancel = this.handleCancel
    const handleService = this.handleService
    const slotDate = moment(this.parseISOString(slot.date)).format('MMM Do YY')
    return (
      <article className="media box">
        <div className="media-left">
          {/* <p>Date: {slotDate}</p> */}
          <p><strong>{slot.time}</strong></p>
          <p>{appointment.status}</p>
          <figure className="image is-64x64">
              <img className="is-rounded" src={stylist.imageUrl} />
            </figure>
          <p>{stylist.name}</p>
        </div>
        <div className="media-content">
          <p>Username: {user.username}</p>
          <p>Phone #: {user.phoneNumber}</p>
          <p>Note: {appointment.note}</p>

          {appointment.status === 'Active' && (
            <div className="level">
              <button
                name={appointment.id}
                type="button"
                className="button level-item"
                onClick={handleService}
              >
                Mark as served
              </button>
              <button
                name={appointment.id}
                type="button"
                className="button level-item"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </article>
    )
  }
}

const mapDispatch = dispatch => ({
  updateSingleAppointmentThunk: (appointmentId, action) =>
    dispatch(updateSingleAppointmentThunk(appointmentId, action))
})

export default connect(null, mapDispatch)(AppointmentCard)
