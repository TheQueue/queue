import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetails} from '../store/business'
import {fetchSlot} from '../store/slot'
import {createNewReservation} from '../store/reservation'
import {createAppointment} from '../store/appointment'
import {Navbar, Footer} from './index'
import Steps, {Step} from 'rc-steps'
import Calendar from 'react-calendar'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import moment from 'moment'
import { SSL_OP_NO_TICKET } from 'constants';
function mapState(state) {
  return {
    business: state.business.single.business,
    isClosed: state.business.single.closed,
    user: state.user,
    slot: state.slot,
    image_url: state.business.single.image_url,
    price: state.business.single.price,
  }
}
function mapDispatch(dispatch) {
  return {
    getB: id => dispatch(getDetails(id)),
    createNewReservation: reservationData => {
      dispatch(createNewReservation(reservationData))
    },
    getSlot: () => dispatch(fetchSlot()),
    createAppointment: appointmentInfo =>
      dispatch(createAppointment(appointmentInfo))
  }
}

class SingleBusiness extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      partySize: 1,
      note: '',
      doneReserve: false,
      currentStep: 0,
      date: new Date(),
      stylistId: NaN,
      slotId: NaN
    }
    this.popup = this.popup.bind(this)
    this.doneInfo = this.doneInfo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.backStep = this.backStep.bind(this)
  }

  componentDidMount() {
    this.props.getB(Number(this.props.match.params.id))
    this.props.getSlot()
    const {email, phoneNumber, name} = this.props.user
    this.setState({
      email,
      phoneNumber,
      name
    })
  }
  nextStep = () => {
    let s = this.state.currentStep + 1
    this.setState({
      currentStep: s
    })
  }
  backStep = () => {
    if (this.state.currentStep >= 0) {
      let s = this.state.currentStep - 1
      this.setState({
        currentStep: s
      })
    }
  }

  onChange = async date => {
    console.log(date)
    await this.setState({date: date})
    console.log(typeof this.state.date)
  }

  popup() {
    this.setState({
      isActive: true
    })
  }
  doneInfo() {
    this.setState({
      isActive: false,
      currentStep: 0
    })
  }
  handleSelect = event => {
    console.log('Selected: ', event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit = async event => {
    event.preventDefault()
    let s = this.state.currentStep + 1
    if (this.state.partySize > 6) {
      alert('Please contact restaurant to make reservation')
    } else {
      this.setState({
        currentStep: s
      })
      const appointmentInfo = {...this.state}
      await this.props.createAppointment(appointmentInfo)
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
    const Icon = ({type}) => <i className={`fa fa-${type}`} />

    const showPrev = !!this.state.currentStep && this.state.currentStep !== 4
    const showNext = this.state.currentStep < 3
    const showConfirm = this.state.currentStep === 3
    console.log(
      this.state.date,
      moment(this.state.date).format('MMM Do YY'),
      moment(this.props.slot[1].date).format('MMM Do YY')
    )
    return (
  
      <React.Fragment>
        <Navbar />
        <div className="insideFrame">
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossOrigin="anonymous"
          />
          <div className="container">
            <div className="box">
              <img className="image" src={this.props.image_url} />
              <div className="media">
                <div className="media-left" />
                <div className="media-content">
                  <div className="title">
                    <p>{this.props.business.name}</p>
                  </div>
                  <div className="subtitle">
                    <p>{this.props.business.address}</p>
                    <p>{this.props.business.phoneNumber}</p>
                    <p>
                      Price:{' '}
                      {this.props.price ? this.props.price : 'not available'}
                    </p>
                  </div>
               
                  {this.props.isClosed ? (
                    <p>Closed</p>
                  ) : (
                    <div>
                      <p>
                        <strong>Open</strong>
                      </p>
                      <button
                        type="button"
                        className="button is-primary"
                        onClick={this.popup}
                      >
                        Reservation
                      </button>
                    </div>
                  )}
                  </div>
                  </div>
        {this.state.isActive && (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-card">
              <header className="modal-card-head">
                <Steps current={this.state.currentStep}>
                  <Step icon={<Icon type="calendar" />} />
                  <Step icon={<Icon type="address-card" />} />
                  <Step icon={<Icon type="clock" />} />
                  <Step icon={<Icon type="check" />} />
                </Steps>
              </header>
              <section className="modal-card-body has-text-centered">
                {this.state.currentStep === 0 && (
                  <div>
                    <strong>Pick Date </strong>
                    <Calendar
                      className="react-calender"
                      minDate={new Date()}
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                  </div>
                )}
                {this.state.currentStep === 1 && (
                  <div>
                    <strong>Pick Stylist </strong>
                    <div className="control" onChange={this.handleSelect}>
                      {this.props.business.stylists.map(stylist => {
                        return (
                          <p key={stylist.id}>
                            <label className="radio">
                              <input
                                type="radio"
                                name="stylistId"
                                value={stylist.id}
                              />
                              {stylist.name}
                            </label>
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}
                {this.state.currentStep === 2 && (
                  <div>
                    <strong>Pick Time </strong>
                    <div className="control" onChange={this.handleSelect}>
                      {this.props.slot
                        ? this.props.slot
                            .filter(
                              slot =>
                                moment(slot.date).format('MMM Do YY') ===
                                moment(this.state.date).format('MMM Do YY')
                            )
                            .map(slot => {
                              return (
                                <p key={slot.id}>
                                  <label className="radio">
                                    <input
                                      type="radio"
                                      name="slotId"
                                      value={slot.id}
                                    />
                                    {slot.time}
                                  </label>
                                </p>
                              )
                            })
                        : null}{' '}
                    </div>
                  </div>
                )}
                {this.state.currentStep === 3 && (
                  <div>
                    <div>
                      <strong>Confirm </strong>
                    </div>
                    <div className="has-text-left">
                      <div>
                        Date: {moment(this.state.date).format('MMM Do YY')}{' '}
                      </div>
                      <div>
                        Stylist:{' '}
                        {
                          this.props.business.stylists[this.state.stylistId - 1]
                            .name
                        }{' '}
                      </div>
                      <div>
                        Time:{' '}
                        {this.props.slot
                          ? this.props.slot
                              .filter(
                                slot =>
                                 this.state.slotId ===
                                  slot.id.toString()
                              )
                              .map(slot => {
                                console.log(slot.time)
                                return (
                                 slot.time
                                )
                              })
                          : null}
                      </div>
                    </div>
                    </div>
                )}
                {this.state.currentStep === 4 && (
                  <div>
                    <i
                      className="fa fa-check-circle is-primary fa-3x"
                      style={{color: 'green'}}
                    />
                    <p>
                      <strong>Congratz! Your reservation is confirmed!</strong>
                    </p>
                  </div>
                )}

                <br />
                {showPrev && (
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={this.backStep}
                  >
                    Back
                  </button>
                )}
                {showNext && (
                  <button
                    type="button"
                    className="button is-warning"
                    onClick={this.nextStep}
                    disabled={
                      this.state.currentStep === 1 &&
                      isNaN(this.state.stylistId)
                    }
                  >
                    Next
                  </button>
                )}
                {showConfirm && (
                  <button
                    type="button"
                    className="button is-success"
                    onClick={this.handleSubmit}
                  >
                    Confirm
                  </button>
                )}
              </section>
              <button
                className="delete is-large"
                aria-label="close"
                onClick={this.doneInfo}
              />
              </div>
            </div>
          )}
        </div>
        </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
