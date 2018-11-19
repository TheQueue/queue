import React, {Component} from 'react'
import {thunkAllB, fetchCategories, setVisibility} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Categories extends Component {
  constructor() {
    super()
    this.state = {
      visibilityFilter: ''
    }
  }
  render() {
    return (
      <select>
        <option />
        {this.props.categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.categoryType}{' '}
          </option>
        ))}
      </select>
    )
  }
}

// const mapStateToProps = state =>({
//   businesses: state.businesses.filter
// })

const mapDispatchToProps = dispatch => ({
  loadBusinesses: () => dispatch(thunkAllB()),
  loadCategories: () => dispatch(fetchCategories),
  setVisibility: visibility => dispatch(setVisibility(visibility))
})

export default connect(mapDispatchToProps)(Categories)
