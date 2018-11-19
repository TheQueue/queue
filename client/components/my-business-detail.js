import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessData} from '../store'
import {ReservationCard} from './index'

class MyBusinessDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessId: props.match.params.businessId
    }
  }
  async componentDidMount() {
    // fetch data
    await this.props.fetchMyBusinessData()
    // filter fetched data to correct business id
  }
  render() {
    const {myBusinesses} = this.props
    const {businessId} = this.state
    // if isLoading value is true -> loading msg
    if (myBusinesses.isLoading) {
      return (
        <div className="box">
          <h1 className="title">My Business - Detail</h1>
          <div>Loading...</div>
        </div>
      )
    }
    // check if entities exists in businessData
    if (myBusinesses.businessData.hasOwnProperty('entities')) {
      const {entities, result} = myBusinesses.businessData
      if (entities.businesses[businessId]) {
        const currBusiness = entities.businesses[businessId]
        return (
          <div className="container">
            <div className="box">
              <h1 className="title">{currBusiness.name}</h1>
              <h2>Business ID: {currBusiness.id}</h2>
              <h2>Address: {currBusiness.address}</h2>
              <h2>Phone: {currBusiness.phoneNumber}</h2>
            </div>
            {currBusiness.queues.length ? (
              <div className="box">
                <h2 className="title">Queue:</h2>
                <h3>
                  Queue Length:{' '}
                  {entities.queues[currBusiness.queues[0]].queueLength}
                </h3>
                <h3>Pending Reservations:</h3>
                {entities.queues[currBusiness.queues[0]].reservations
                  .length && (
                  <div>
                    {entities.queues[currBusiness.queues[0]].reservations
                      .map(
                        reservationId => entities.reservations[reservationId]
                      )
                      .filter(res => res.status === 'Pending')
                      .map(reservation => (
                        <ReservationCard
                          reservation={reservation}
                          key={reservation.id}
                        />
                      ))}
                  </div>
                )}
                <h3>Active Reservations:</h3>
                {entities.queues[currBusiness.queues[0]].queueLength && (
                  <div>
                    {entities.queues[currBusiness.queues[0]].reservations.map(
                      reservationId => {
                        const reservation = entities.reservations[reservationId]
                        return (
                          <ReservationCard
                            reservation={reservation}
                            key={reservation.id}
                          />
                        )
                      }
                    )}
                  </div>
                )}
                <h3>Serviced Reservations:</h3>
                {entities.queues[currBusiness.queues[0]].reservations
                  .length && (
                  <div>
                    {entities.queues[currBusiness.queues[0]].reservations
                      .map(
                        reservationId => entities.reservations[reservationId]
                      )
                      .filter(res => res.status === 'Serviced')
                      .map(reservation => (
                        <ReservationCard
                          reservation={reservation}
                          key={reservation.id}
                        />
                      ))}
                  </div>
                )}
              </div>
            ) : (
              'no queue'
            )}
          </div>
        )
      } else {
        return (
          <div>
            <h1>Business not found</h1>
          </div>
        )
      }
    }
  }
}

const mapState = state => ({
  myBusinesses: state.myBusinesses
})

const mapDispatch = dispatch => ({
  fetchMyBusinessData: () => dispatch(fetchMyBusinessData())
})

export default connect(mapState, mapDispatch)(MyBusinessDetail)
