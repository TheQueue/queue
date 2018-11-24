import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {Link} from 'react-router-dom'
import BusinessCard from './businessCard'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {thunkAllB} from '../store/business'
import Navbar from './navbar/navbarMain'
import Footer from './footer'
function mapState(state) {
  return {
    business: state.business.businesses
  }
}
const mapDispatch = dispatch => {
  return {
    fetchB: () => {
      dispatch(thunkAllB())
    }
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'col',
    justify: 'flex-start',
    alignItems: 'baseline'
  }
})

export class BusinessList extends React.Component {
  componentDidMount() {
    try {
      this.props.fetchB()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.props.business) return <div>No Business</div>
    console.dir(this.props.business)
    const {classes} = this.props
    console.log('MMM', this.props)
    return (
      <React.Fragment>
        <Navbar />
        <section className="section">
          <h1 className="title">Business List</h1>
        </section>
        <section className="section">
          <div className="container">
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
export default connect(mapState, mapDispatch)(withStyles(styles)(BusinessList))
