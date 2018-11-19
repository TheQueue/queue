import React, {Component} from 'react'
import {connect} from 'react-redux'
import {approveSingleReservation} from '../store'
const ReservationCard = props => {
  const {reservation, handleApprove} = props
  return (
    <article className="media box">
      <div className="media-left">
        <h3>
          {reservation.queuePosition ? `# ${reservation.queuePosition}` : 'n/a'}
        </h3>
      </div>
      <div className="media-content">
        <p>Name: {reservation.name}</p>
        <p>
          Status: {reservation.status}
          {reservation.status === 'Pending' && (
            <button name={reservation.id} type="button" className="button" onClick={handleApprove}>
              Approve
            </button>
          )}
        </p>
        <p>Phone #: {reservation.phoneNumber}</p>
        <p>Party Size: {reservation.partySize}</p>
        <p>Date booked: {reservation.dateBooked}</p>
        <p>Note: {reservation.note}</p>
        <p>Estimated time of service: {reservation.estimatedTimeOfService}</p>
      </div>
    </article>
  )
}

const mapDispatch = dispatch => ({
  handleApprove: (event) => {
    const reservationId = event.target.name
    dispatch(approveSingleReservation(reservationId))
  }
})

export default connect(null, mapDispatch)(ReservationCard)
