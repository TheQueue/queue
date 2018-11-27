import React, {Component} from 'react'
import {thunkAllB, fetchCategories, setVisibility} from '../store'
import {connect} from 'react-redux'
import {BusinessCard} from './index'

class Categories extends Component {
  constructor() {
    super()
    this.state = {
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadCategories()
  }
  componentWillUnmount() {
    this.props.loadBusinesses()
  }

  handleChange(event) {
    this.setState({category: event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault()
    const currCat = this.state.category
    this.props.loadBusinesses(currCat)
  }
  render() {
    if (!this.props.categories.length) {
      return <div>Categories loading</div>
    }
    const {classes} = this.props
    return (
      <div className="field has-addons">
        <div className="control">
          <span className="select">
            <select onChange={this.handleChange}>
              <option>Show all</option>
              {this.props.categories.map(category => (
                <option key={category.id} value={category.categoryType}>
                  {category.categoryType}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-info"
            onClick={this.handleSubmit}
          >
            Apply Filter
          </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
