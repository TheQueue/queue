import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {getDetails} from '../store/business'

function mapState(state) {
  return {}
}
function mapDispatch(dispatch) {
  return {}
}

class SingleBusiness extends React.Component {
  componentDidMount() {
    this.props.getDetails(Number(this.props.match.params.id))
  }
  componentWillUnmount() {}
  render() {
    // if () return <div>No Product</div>
    console.log(this.props)
    return (
      <div className="sp">
        <img src="" />
        <h3 />
        <p />
        <Button size="large" color="primary" variant="contained">
          Stufff
        </Button>

        <p />
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
