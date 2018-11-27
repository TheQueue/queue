import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetails} from '../store/business'
import {createNewReservation} from '../store/reservation'
import ChatBot from './chatBot'

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
    this.plus = this.plus.bind(this)
    this.minus = this.minus.bind(this)
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

  plus() {
    this.setState((prevState, props) => ({
      partySize: prevState.partySize + 1
    }))
  }
  minus() {
    if (this.state.partySize > 1) {
      this.setState((prevState, props) => ({
        partySize: prevState.partySize - 1
      }))
    }
  }
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
    console.log(this.props.user, this.state)

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
            <ChatBot />
          </div>
        )}
        {this.state.isActive && (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
              <form
                onClick={this.handleSubmit}
                className="card is-rounded has-text-centered"
              >
                <div className="card-content has-text-centered">
                  <h3 className="has-text-centered">Party Size</h3>

                  <i className="fa fa-minus fa-2x" onClick={this.minus} />

                  <b className="is-size-4">
                    <strong>
                      {' '}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                        this.state.partySize
                      }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </strong>
                  </b>

                  <i className="fa fa-plus fa-2x" onClick={this.plus} />

                  <p className="control has-icon">
                    <i className="fa fa-user" />
                    <input
                      className="input"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </p>
                  <p className="control has-icon">
                    <i className="fa fa-envelope" />
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </p>
                  <p className="control has-icon">
                    <i className="fa fa-mobile" />
                    <input
                      className="input"
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                    />
                  </p>
                  <p className="control has-icon">
                    <i className="fa fa-sticky-note" />
                    <input
                      className="input"
                      type="text"
                      name="note"
                      placeholder="Note (ex. high chair, allergies)"
                      value={this.state.note}
                      onChange={this.handleChange}
                    />
                  </p>
                  <p className="control">
                    <button
                      className="button is-primary is-medium is-fullwidth"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="button is-danger is-medium is-fullwidth"
                      type="cancel"
                      onClick={this.doneInfo}
                    >
                      Cancel
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
        <p />
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
