import React, {Component} from 'react'
import {connect} from 'react-redux'
//import history from '../history'
import IconButton from '@material-ui/core/IconButton'
import {searchBusiness} from '../store/business'
import BusinessCard from './businessCard'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'col',
    justify: 'flex-start',
    alignItems: 'baseline'
  }
})

<<<<<<< HEAD
class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.loadMap(this.state.name)
  }
  render() {
    const {classes} = this.props
    const isEnabled = this.state.name.length > 0
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Search..."
            onChange={this.handleChange}
            value={this.state.name}
            required
          />
          <IconButton type="submit" aria-label="Search" disabled={!isEnabled} />
        </form>
        <div>
          <React.Fragment>
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={16}>
                  {this.props.businesses.map(busnss => (
                    <Grid key={busnss.id} item>
                      <BusinessCard business={busnss} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        </div>
      </div>
    )
  }
=======
export const Search= () => {

  return (
    <div className="insideFrame login animated slideInRight">
     this is Filter
    </div>
  )
>>>>>>> master
}

const mapStateToProps = state => ({
  businesses: state.business.businesses
})

const mapDispatchToProps = dispatch => {
  return {
    loadMap: data => dispatch(searchBusiness(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SearchBar)
)
