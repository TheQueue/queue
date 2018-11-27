import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {Link} from 'react-router-dom'
import {thunkAllB} from '../store/business'
import {Footer, Navbar, BusinessCard, Categories} from './index'
function mapState(state) {
  return {
    business: state.business.businesses,
    isFilterVisible: state.categories.isFilterVisible
  }
}
const mapDispatch = dispatch => {
  return {
    fetchB: () => {
      dispatch(thunkAllB())
    }
  }
}

class BusinessList extends React.Component {
  componentDidMount() {
    try {
      this.props.fetchB()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.props.business) return <div>No Business</div>
    const {classes, isFilterVisible} = this.props
    return (
      <React.Fragment>
        <Navbar />
        <section className="section insideFrame">
          <div className="container">
          {isFilterVisible && <Categories />}
            {this.props.business.map(busnss => (
              <BusinessCard key={busnss.id} business={busnss} />
            ))}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}
export default connect(mapState, mapDispatch)(BusinessList)
