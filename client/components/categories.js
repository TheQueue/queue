import React, {Component} from 'react'
import {thunkAllB, fetchCategories, setVisibility} from '../store'
import {connect} from 'react-redux'
import BusinessCard from './businessCard'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'

//import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'col',
    justify: 'flex-start',
    alignItems: 'baseline'
  }
})

class Categories extends Component {
  constructor() {
    super()
    this.state = {
      visibilityFilter: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadCategories()
  }

  handleChange(event) {
    console.log('event changed', event.target.value)

    this.props.loadBusinesses(event.target.value)
  }

  render() {
    if (!this.props.categories.length) {
      return <div>There is no this category yet</div>
    }
    console.log(this.props.businesses)
    const {classes} = this.props
    return (
      <div>
        <select onChange={this.handleChange}>
          <option />
          {this.props.categories.map(category => (
            <option key={category.id} value={category.categoryType}>
              {category.categoryType}{' '}
            </option>
          ))}
        </select>
        {this.props.businesses && (
          <div>
            {/*this.props.businesses.map(bus => (
              <div key={bus.id}>
                {' '}
                <BusinessCard business={bus} />
              </div>
            ))*/}
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
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  businesses: state.business.businesses
})

const mapDispatchToProps = dispatch => ({
  loadBusinesses: stuff => dispatch(thunkAllB(stuff)),
  loadCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Categories)
)
