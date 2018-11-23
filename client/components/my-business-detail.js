import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessData} from '../store'
import {ReservationCard, AddStylist, EditStylist} from './index'

class MyBusinessDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessId: props.match.params.businessId,
      isAddStylistActive: false,
      isEditStylistActive: false
    }
  }
  async componentDidMount() {
    // fetch data
    await this.props.fetchMyBusinessData()
    // filter fetched data to correct business id
  }
  parseISOString(s) {
    var b = s.split(/\D+/)
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
  }

  renderAddStylistForm() {
    return (
      <AddStylist
        isActive={this.state.isAddStylistActive}
        toggleAddStylist={this.toggleAddStylist}
        businessId={this.state.businessId}
      />
    )
  }
  renderEditStylistForm(stylist) {
    return (
      <EditStylist
        isActive={this.state.isEditStylistActive}
        toggleAddStylist={this.toggleEditStylist}
        businessId={this.state.businessId}
        stylist={stylist}
      />
    )
  }
  toggleAddStylist = event => {
    let curVal = this.state.isAddStylistActive
    this.setState({isAddStylistActive: !curVal})
  }
  toggleEditStylist = event => {
    let curVal = this.state.isEditStylistActive
    this.setState({isEditStylistActive: !curVal})
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
        // if no associated queue for current business...
        // return this
        if (!currBusiness.stylists.length) {
          return (
            <div className="container">
              <div className="box">
                <h1 className="title">{currBusiness.name}</h1>
                <h2>Business ID: {currBusiness.id}</h2>
                <h2>Address: {currBusiness.address}</h2>
                <h2>Phone: {currBusiness.phoneNumber}</h2>
              </div>
              <div className="box">
                <h2>No stylist found.</h2>
                <button
                  type="button"
                  className="button"
                  onClick={this.toggleAddStylist}
                >
                  Add new stylist
                </button>
                {this.renderAddStylistForm()}
              </div>
            </div>
          )
        } else {
          // this else block renders business info + queue data
          const matchingReservs = {}
          const statusList = ['Active', 'Serviced', 'Cancelled']
          return (
            <div className="container">
              <div className="box">
                <h1 className="title">{currBusiness.name}</h1>
                <h2>Business ID: {currBusiness.id}</h2>
                <h2>Address: {currBusiness.address}</h2>
                <h2>Phone: {currBusiness.phoneNumber}</h2>
              </div>
              <div className="box">
                <button
                  type="button"
                  className="button"
                  onClick={this.toggleAddStylist}
                >
                  Add new stylist
                </button>
              </div>
              <div className="box">
                {this.renderAddStylistForm()}
                {currBusiness.stylists.map(stylistId => {
                  let stylist = entities.stylists[stylistId]
                  return (
                    <div className="media" key={stylist.id}>
                      <div className="media-left">
                        {stylist.imageUrl ? (
                          <img src="imageUrl" />
                        ) : (
                          <p>No image</p>
                        )}
                      </div>
                      <div className="media-content">
                        <p>{stylist.name}</p>
                        <p>{stylist.email}</p>
                        <p>{stylist.phoneNumber}</p>
                        {stylist.reservations.map(reservationId => {
                          let reservation = entities.reservations[reservationId]
                          return (
                            <ReservationCard
                              key={reservationId}
                              reservation={reservation}
                            />
                          )
                        })}
                      </div>
                      <div className="media-right">
                        {this.renderEditStylistForm(stylist)}
                        <button
                          type="button"
                          className="button"
                          onClick={this.toggleEditStylist}
                        >
                          Edit stylist information
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
      } else {
        // this is for if the business with specified businessId
        // is not found in the loaded data
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
