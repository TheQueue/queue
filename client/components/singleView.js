import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetails} from '../store/business'
import {createNewReservation} from '../store/reservation'

function mapState(state) {
  return {
    business: state.business.single.business,
    isClosed: state.business.single.closed,
    user: state.user
  }
}
function mapDispatch(dispatch) {
  return {
    getB: id => dispatch(getDetails(id)),
    createNewReservation: reservationData => {
      dispatch(createNewReservation(reservationData))
    }
  }
}

class SingleBusiness extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      partySize: 1,
      note: '',
      doneReserve: false
    }
    this.popup = this.popup.bind(this)
    this.doneInfo = this.doneInfo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getB(Number(this.props.match.params.id))
    const {email, phoneNumber, name} = this.props.user
    this.setState({
      email,
      phoneNumber,
      name
    })
  }
  componentWillUnmount() {}

  popup() {
    this.setState({
      isActive: true
    })
  }
  doneInfo() {
    this.setState({
      isActive: false
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.partySize > 6) {
      alert('Please contact restaurant to make reservation')
    } else {
      this.setState({
        isActive: false,
        doneReserve: true
      })
      const reservationData = {...this.state}
      await this.props.createNewReservation(reservationData)
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (
      (!this.props.business && !this.props.isClosed) ||
      this.props.business.id !== Number(this.props.match.params.id)
    ) {
      return <div />
    }
    return (
      <div className="sp">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossOrigin="anonymous"
        />
        <img src={this.props.business.imageUrl} />
        <h3>{this.props.business.name}</h3>
        <p />
        Address: {this.props.business.address}
        phoneNumber: {this.props.business.phoneNumber}
        {this.props.isClosed ? (
          <p>Closed</p>
        ) : (
          <div>
            <p>Open</p>
            <a className="button is-primary" onClick={this.popup}>
              Reservation
            </a>
          </div>
        )}
        {this.state.isActive && (
          <ul className="steps is-vertical is-narrow is-medium is-centered has-content-centered">
            <li className="steps-segment is-active">
              <a href="#" className="has-text-dark">
                <span className="steps-marker">
                  <span className="icon">
                    <i className="fa fa-shopping-cart" />
                  </span>
                </span>
                <div className="steps-content">
                  <p className="heading">Shopping Cart</p>
                </div>
              </a>
            </li>
            <li className="steps-segment">
              <a href="#" className="has-text-dark">
                <span className="steps-marker">
                  <span className="icon">
                    <i className="fa fa-user" />
                  </span>
                </span>
                <div className="steps-content">
                  <p className="heading">User Information</p>
                </div>
              </a>
            </li>
            <li className="steps-segment is-active has-gaps">
              <span className="steps-marker">
                <span className="icon">
                  <i className="fa fa-usd" />
                </span>
              </span>
              <div className="steps-content">
                <p className="heading">Payment</p>
              </div>
            </li>
            <li className="steps-segment">
              <span className="steps-marker is-hollow">
                <span className="icon">
                  <i className="fa fa-check" />
                </span>
              </span>
              <div className="steps-content">
                <p className="heading">Confirmation</p>
              </div>
            </li>
          </ul>
        )}
        <p />
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
