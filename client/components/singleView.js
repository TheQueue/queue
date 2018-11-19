import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {getDetails} from '../store/business'

function mapState(state) {
  return {
    business: state.business.single
  }
}
function mapDispatch(dispatch) {
  return {
    getB: id => dispatch(getDetails(id))
  }
}

class SingleBusiness extends React.Component {
  componentDidMount() {
    this.props.getB(Number(this.props.match.params.id))
  }
  componentWillUnmount() {}
  render() {
    console.log(this.props)
    return (
      <div className="sp">
        <img src={this.props.business.imageUrl} />
        <h3>{this.props.business.name}</h3>
        <p />
        Address: {this.props.business.address}
        phoneNumber: {this.props.business.phoneNumber}
        <Button size="large" color="primary" variant="contained">
          Stufff
        </Button>
        <p />
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
