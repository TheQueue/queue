import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMyBusinessDataThunk} from '../store'
import {Link} from 'react-router-dom'
import {Navbar, Footer} from './index'
class MyBusinesses extends Component {
  componentDidMount() {
    this.props.fetchMyBusinessDataThunk()
  }
  render() {
    const {myBusinesses} = this.props

    // if isLoading value is true -> loading msg
    if (myBusinesses.isLoading) {
      return (
        <React.Fragment>
          <Navbar />
          <div className="insideFrame">
            <h1>My Businesses</h1>
            <div>Loading...</div>
          </div>
          <Footer />
        </React.Fragment>
      )
    }
    // else render returned data
    if (myBusinesses.businessData.hasOwnProperty('entities')) {
      const {entities, result} = myBusinesses.businessData
      return (
        <React.Fragment>
          <Navbar />
          <div className="insideFrame">
            <div className="container">
                <h1 className="box title has-text-centered">My Businesses</h1>
                {result.map(businessId => {
                  const business = entities.businesses[businessId]
                  return (
                    <div className="box has-background-light" key={business.id}>
                      <Link to={`/my-businesses/${business.id}`}>
                        <h1 className="title">{business.name}</h1>
                      </Link>
                      <h2>Business ID: {business.id}</h2>
                      <h2>Stylists: {business.stylists.length}</h2>
                    </div>
                  )
                })}
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )
    }
  }
}

const mapState = state => ({
  myBusinesses: state.myBusinesses
})

const mapDispatch = dispatch => ({
  fetchMyBusinessDataThunk: () => dispatch(fetchMyBusinessDataThunk())
})

export default connect(mapState, mapDispatch)(MyBusinesses)
