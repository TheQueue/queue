import React, {Component} from 'react'
import {thunkAllB, fetchCategories, setVisibility} from '../store'
import {connect} from 'react-redux'

//import {Link} from 'react-router-dom'

class Categories extends Component {
  constructor() {
    super()
    this.state = {
      visibilityFilter: '',
      b: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadBusinesses()
    this.props.loadCategories()
  }

  handleChange(event) {
    console.log('event changed', event.target.value)
    //his.props.setVisibility(event.target.value)
    this.props.loadBusinesses(event.target.value)
  }

  render() {
    if (!this.props.categories.length) {
      return <div>There is no this category yet</div>
    }
    console.log(this.props.businesses)
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
        {}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  businesses: state.business
})

const mapDispatchToProps = dispatch => ({
  loadBusinesses: stuff => dispatch(thunkAllB(stuff)),
  loadCategories: () => dispatch(fetchCategories())
  //setVisibility: visibility => dispatch(setVisibility(visibility))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
