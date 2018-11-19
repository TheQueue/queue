import React, {Component} from 'react'
import {thunkAllB, fetchCategories, setVisibility} from '../store'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'

class Categories extends Component {
  constructor() {
    super()
    this.state = {
      visibilityFilter: ''
    }
  }
  componentDidMount() {
    this.props.loadBusinesses()
    this.props.loadCategories()
  }

  handleChange(event) {
    console.log('event changed', event.target.value)
    this.props.setVisibility(event.target.value)
  }

  render() {
    if (!this.props.categories.length) {
      return <div>There is no this category yet</div>
    }
    return (
      <div>
        <select onChange={this.handleChange}>
          <option />
          {this.props.categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.categoryType}{' '}
            </option>
          ))}
        </select>
        <div />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  businesses: state.business
})

const mapDispatchToProps = dispatch => ({
  loadBusinesses: () => dispatch(thunkAllB()),
  loadCategories: () => dispatch(fetchCategories()),
  setVisibility: visibility => dispatch(setVisibility(visibility))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
