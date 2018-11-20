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
      <div>
        <Navbar/>
        
        <div className="insideFrame">
      <React.Fragment>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.business.map(busnss => (
                <Grid key={busnss.id} item>
                  <BusinessCard business={busnss} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
      </div>
      <Footer />
      </div>
    )
  }
}
export default connect(mapState, mapDispatch)(withStyles(styles)(BusinessList))
