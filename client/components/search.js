import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {searchBusiness, clearBusinessSearch} from '../store/'
import {Link} from 'react-router-dom'
import {Footer, Navbar, BusinessCard, Categories} from './index'


class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      prevSearch: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const urlParamStr = this.props.location.search.slice(1)
    if (urlParamStr.includes("key=")) {
      const key = urlParamStr.slice(urlParamStr.indexOf("key=") + 4)
      this.props.loadMap(key)
      this.setState({prevSearch: key})
    } else {
      this.props.clearBusinessSearch()
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.loadMap(this.state.name)
    const name = this.state.name
    this.setState({name: '', prevSearch: name})
    history.push(`/search?key=${this.state.name}`)
  }
  handleClear = (event) => {
    this.props.clearBusinessSearch()
    this.setState({name: '', prevSearch: ''})
    history.push(`/search`)
  }
  render() {
    const {classes} = this.props
    const isEnabled = this.state.name.length > 0
    return (
      <React.Fragment>
        <Navbar />
        <section className="section insideFrame">
          <Categories/>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                type="text"
                name="name"
                placeholder="Search..."
                onChange={this.handleChange}
                value={this.state.name}
                className="input"
                required
              />
            </div>
            <div className="control">
              <button
                onClick={this.handleSubmit}
                className="button is-info"
                type="submit"
                aria-label="Search"
                disabled={!isEnabled}
              ><i className="fas fa-search"/>
              </button>
            </div>
          </div>
          {this.state.prevSearch && <div className="box">Search term: {this.state.prevSearch} <i className="delete" onClick={this.handleClear}/>
          </div>}
          <div className="container">
            {this.props.businesses.map(busnss => (
              <BusinessCard key={busnss.id} business={busnss} />
            ))}
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  businesses: state.business.businesses
})

const mapDispatchToProps = dispatch => {
  return {
    loadMap: data => dispatch(searchBusiness(data)),
    clearBusinessSearch: () => dispatch(clearBusinessSearch())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
