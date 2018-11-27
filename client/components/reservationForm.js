import React, {Component} from 'react'
import {connect} from 'react-redux'
import Calendar from 'react-calendar'
import Steps, {Step} from 'rc-steps'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import moment from 'moment'
import {createAppointment} from '../store'

class ReservationForm extends Component {
  // Initialize all input of date type.
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      // doneReserve: false,
      currentStep: 0,
      date: new Date(),
      stylistId: NaN,
      slotId: NaN
    }
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
  onChange = date => {
    console.log(date)
    this.setState({date})
  }
  handleSelect = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit = async event => {
    event.preventDefault()
    let s = this.state.currentStep + 1
    this.setState({
      currentStep: s
    })
    const appointmentInfo = {...this.state}
    await this.props.createAppointment(appointmentInfo)
  }
  renderStepZero() {
    return this.state.currentStep === 0 ? (
      <div>
        <strong>Pick Date </strong>
        <Calendar
          className="react-calender"
          minDate={new Date()}
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    ) : null
  }
  renderStepOne() {
    return this.state.currentStep === 1 ? (
      <div>
        <strong>Pick Stylist </strong>
        <div className="control" onChange={this.handleSelect}>
          {this.props.business.stylists.map(stylist => (
            <p key={stylist.id}>
              <label className="radio">
                <input type="radio" name="stylistId" value={stylist.id} />
                {stylist.name}
              </label>
            </p>
          ))}
        </div>
      </div>
    ) : null
  }
  renderStepTwo() {
    return this.state.currentStep === 2 ? (
      <div>
        <strong>Pick Time</strong>
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
                        <input type="radio" name="slotId" value={slot.id} />
                        {slot.time}
                      </label>
                    </p>
                  )
                })
            : null}
        </div>
      </div>
    ) : null
  }
  renderStepThree() {
    return this.state.currentStep === 3 ? (
      <div>
        <div>
          <strong>Confirm </strong>
        </div>
        <div className="has-text-left">
          <div>Date: {moment(this.state.date).format('MMM Do YY')} </div>
          <div>
            Stylist:{' '}
            {this.props.business.stylists[this.state.stylistId - 1].name}{' '}
          </div>
          <div>
            Time:{' '}
            {this.props.slot
              ? this.props.slot
                  .filter(slot => this.state.slotId === slot.id.toString())
                  .map(slot => {
                    console.log(slot.time)
                    return slot.time
                  })
              : null}
          </div>
        </div>
      </div>
    ) : null
  }
  renderStepFour() {
    return this.state.currentStep === 4 ? (
      <div>
        <i
          className="fa fa-check-circle is-primary fa-3x"
          style={{color: 'green'}}
        />
        <p>
          <strong>Congratz! Your reservation is confirmed!</strong>
        </p>
      </div>
    ) : null
  }
  renderBackBtn() {
    return (
      <button
        type="button"
        className="button is-primary"
        onClick={this.backStep}
      >
        Back
      </button>
    )
  }
  renderNextBtn() {
    let disabled = false
    if (this.state.currentStep === 1) {
      disabled = isNaN(this.state.stylistId)
    } else if (this.state.currentStep === 2) {
      disabled = isNaN(this.state.slotId)
    }
    return (
      <button
        type="button"
        className="button is-warning"
        onClick={this.nextStep}
        disabled={disabled}
      >
        Next
      </button>
    )
  }
  render() {
    const Icon = ({type}) => <i className={`fa fa-${type}`} />
    const showPrev = !!this.state.currentStep && this.state.currentStep !== 4
    const showNext = this.state.currentStep < 3
    const showConfirm = this.state.currentStep === 3
    return (
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
            {this.renderStepZero()}
            {this.renderStepOne()}
            {this.renderStepTwo()}
            {this.renderStepThree()}
            {this.renderStepFour()}
            <br />
            {showPrev && this.renderBackBtn()}
            {showNext && this.renderNextBtn()}
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
            type="button"
            className="delete is-large"
            aria-label="close"
            onClick={this.props.doneInfo}
          />
        </div>
      </div>
    )
  }
}


const mapState = (state) => ({
  business: state.business.single.business,
})

const mapDispatch = (dispatch) => ({
  createAppointment: appointmentInfo =>
  dispatch(createAppointment(appointmentInfo))
})

export default connect(mapState, mapDispatch)(ReservationForm)
