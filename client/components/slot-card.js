import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AppointmentCard} from './index'
// import {updateSingleAppointmentThunk} from '../store'
import moment from 'moment'

class SlotCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleCancel = event => {
    event.preventDefault()
    // const apptId = event.target.name
    // this.props.updateSingleAppointmentThunk(apptId, 'cancel')
  }

  // converts dateandtime value from sequelize -> Date object
  parseISOString(s) {
    var b = s.split(/\D+/)
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
  }

  render() {
    const {slot, stylist, stylSlot, entities} = this.props
    const handleCancel = this.handleCancel
    const isSlotBooked = stylSlot.status === 'Booked'
    // const slotDate = moment(this.parseISOString(slot.date)).format('MMM Do YY')
    if (isSlotBooked) {
      const allAppointments = Object.values(entities.appointments)
      // console.log('all appt: ', allAppointments)
      // console.log('slotid: ', slot.id)
      // console.log('stylid: ', stylist.id)

      const appointment = allAppointments.filter(
        appt => appt.slotId === slot.id && appt.stylistId === stylist.id
      )[0]
      // console.log('appt: ', appointment)
      const user = entities.users[appointment.user]
      // console.log('user: ', user)
      // return <div>Error</div>
      return (
        <AppointmentCard
          appointment={appointment}
          user={user}
          slot={slot}
          stylist={stylist}
        />
      )
    } else {
      return (
        <article className="media box">
          <div className="media-left">
            <p>
              <strong>{slot.time}</strong>
            </p>
            <p>{stylist.name}</p>
          </div>
          <div className="media-content">
            <p>{stylSlot.status}</p>
            <p>
              <button
                name={stylSlot.id}
                type="button"
                className="button level-item"
                onClick={handleCancel}
              >
                Delete
              </button>
            </p>
          </div>
        </article>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  updateSingleAppointmentThunk: (appointmentId, action) =>
    dispatch(updateSingleAppointmentThunk(appointmentId, action))
})

export default connect(null, mapDispatch)(SlotCard)
