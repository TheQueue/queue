import React, {Component} from 'react'
import {connect} from 'react-redux'
import {approveSingleReservation, markReservationAsServed} from '../store'

const ReservationCard = props => {
  const {reservation, handleApprovePending, handleServeActive} = props

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
            <button name={reservation.id} type="button" className="button" onClick={handleApprovePending}>
              Approve
            </button>
          )}
          {reservation.status === 'Active' && (
            <button name={reservation.id} type="button" className="button" onClick={handleServeActive}>
              Mark as served
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
  handleApprovePending: (event) => {
    const reservationId = event.target.name
    dispatch(approveSingleReservation(reservationId))
  },
  handleServeActive: (event) => {
    const reservationId = event.target.name
    dispatch(markReservationAsServed(reservationId))
  }
})

export default connect(null, mapDispatch)(ReservationCard)
