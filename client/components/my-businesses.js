import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessData} from '../store'

class MyBusinesses extends Component {
  componentDidMount() {
    this.props.fetchMyBusinessData()
  }
  render() {
    const {myBusinesses} = this.props

    // if isLoading value is true -> loading msg
    if (myBusinesses.isLoading) {
      return (
        <div>
          <h1>My Businesses</h1>
          <div>Loading...</div>
        </div>
      )
    }
    // if businessData exists, render it
    if (myBusinesses.businessData) {
      return (
        <div>
          <h1>My Businesses</h1>
          <div>
            {myBusinesses.businessData.map(business => (
              <div key={business.id}>
                <h1>{business.name}</h1>
                <h2>Business ID: {business.id}</h2>
              </div>
            ))}
          </div>
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

export default connect(mapState, mapDispatch)(MyBusinesses)
