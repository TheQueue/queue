import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessDataThunk, deleteStylistThunk} from '../store'
import {
  AppointmentCard,
  AddStylist,
  EditStylist,
  MyBusinessCalendar
} from './index'

class MyBusinessDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessId: props.match.params.businessId,
      isAddStylistActive: false,
      currentEditStylistId: NaN,
      isEditStylistActive: false,
    }
  }
  async componentDidMount() {
    // fetch data
    await this.props.fetchMyBusinessDataThunk()
    // filter fetched data to correct business id
  }
  parseISOString(s) {
    var b = s.split(/\D+/)
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
  }

  renderAddStylistForm() {
    return this.state.isAddStylistActive ? (
      <AddStylist
        isActive={this.state.isAddStylistActive}
        toggleForm={this.toggleAddStylist}
        businessId={this.state.businessId}
      />
    ) : null
  }
  renderEditStylistForm(stylist) {
    // only render the edit form for the specific stylist
    if (this.state.currentEditStylistId === stylist.id) {
      return this.state.isEditStylistActive ? (
        <EditStylist
          isActive={this.state.isEditStylistActive}
          toggleForm={this.toggleEditStylist}
          businessId={this.state.businessId}
          stylist={stylist}
        />
      ) : null
    } else {
      return null
    }
  }
  toggleAddStylist = event => {
    let curVal = this.state.isAddStylistActive
    this.setState({isAddStylistActive: !curVal})
  }
  toggleEditStylist = event => {
    let curVal = this.state.isEditStylistActive
    if (curVal) {
      this.setState({isEditStylistActive: false, currentEditStylistId: NaN})
    } else {
      this.setState({
        isEditStylistActive: true,
        currentEditStylistId: Number(event.target.name)
      })
    }
  }
  handleDeleteStylist = async event => {
    await this.props.deleteStylistThunk(
      Number(event.target.name),
      Number(this.state.businessId)
    )
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
            <div className="container insideFrame">
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
                        {/* {stylist.appointments.map(appId => {
                          const app = entities.appointments[appId]
                          const user = entities.users[app.user]
                          const slot = entities.slots[app.slot]
                          return (
                            <AppointmentCard key={appId} appointment={app} user={user} slot={slot}/>
                          )
                        })} */}
                      </div>
                      <div className="media-right">
                        {this.renderEditStylistForm(stylist)}
                        <p>
                          <button
                            type="button"
                            className="button"
                            onClick={this.toggleEditStylist}
                            name={stylist.id}
                          >
                            Edit information
                          </button>
                        </p>
                        <p>
                          <button
                            type="button"
                            className="button"
                            onClick={this.handleDeleteStylist}
                            name={stylist.id}
                          >
                            Delete stylist
                          </button>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <MyBusinessCalendar
                currBusiness={currBusiness}
                entities = {entities}
              />
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
  fetchMyBusinessDataThunk: () => dispatch(fetchMyBusinessDataThunk()),
  deleteStylistThunk: (stylistId, businessId) =>
    dispatch(deleteStylistThunk(stylistId, businessId))
})

export default connect(mapState, mapDispatch)(MyBusinessDetail)
