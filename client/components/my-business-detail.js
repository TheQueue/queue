import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessData} from '../store'

class MyBusinessDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessId: props.match.params.businessId,
      myBusiness: {}
    }
  }
  async componentDidMount() {
    // fetch data
    await this.props.fetchMyBusinessData()
    console.log('businessdata: ', this.props.myBusinesses.businessData)
    console.log('businessId in state', this.state.businessId)
    // filter fetched data to correct business id
    const myBusiness = this.props.myBusinesses.businessData.filter(
      business => +business.id === +this.state.businessId
    )
    // if found, store in state
    if (myBusiness.length) this.setState({myBusiness: myBusiness[0]})
  }

  render() {
    const {myBusinesses} = this.props
    const {myBusiness, businessId} = this.state
    // if isLoading value is true -> loading msg
    if (myBusinesses.isLoading) {
      return (
        <div>
          <h1>My Business - Detail</h1>
          <div>Loading...</div>
        </div>
      )
    }
    if (myBusiness.hasOwnProperty('name') === false) {
      return <div>Not found</div>
    } else {
      return (
        <div>
          <h1>{myBusiness.name}</h1>
          <h2>Business ID: {myBusiness.id}</h2>
          <h2>Address: {myBusiness.address}</h2>
          <h2>Phone: {myBusiness.phoneNumber}</h2>
        </div>
      )
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
