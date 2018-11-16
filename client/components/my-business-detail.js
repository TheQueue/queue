import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessData} from '../store'

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
        <div>
          <h1>My Business - Detail</h1>
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
          <div>
            <h1>{currBusiness.name}</h1>
            <h2>Business ID: {currBusiness.id}</h2>
            <h2>Address: {currBusiness.address}</h2>
            <h2>Phone: {currBusiness.phoneNumber}</h2>
            <h2>Queue:</h2>
            {currBusiness.queues.length ? (
              <div>
                <h3>
                  Queue Length:{' '}
                  {entities.queues[currBusiness.queues[0]].queueLength}
                </h3>
                <h3>Reservations: </h3>
                {entities.queues[currBusiness.queues[0]].queueLength && (
                  <ul>
                    {entities.queues[currBusiness.queues[0]].reservations.map(
                      reservationId => {
                        const reservation = entities.reservations[reservationId]
                        return (
                          <li key={reservation.id}>
                            <h3>Name: {reservation.name}</h3>
                            <h3>Status: {reservation.status}</h3>
                            <h3>Party Size: {reservation.partySize}</h3>
                            <h3>Date booked: {reservation.dateBooked}</h3>
                          </li>
                        )
                      }
                    )}
                  </ul>
                )}
              </div>
            ) : 'no queue'}
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
