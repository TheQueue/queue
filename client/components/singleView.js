import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetails} from '../store/business'
import {createNewReservation} from '../store/reservation'
import {Navbar, Footer} from './index'
import Steps, {Step} from 'rc-steps'
import Calendar from 'react-calendar'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'

function mapState(state) {
  return {
    business: state.business.single.business,
    isClosed: state.business.single.closed,
    image_url: state.business.single.image_url,
    price: state.business.single.price,
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
      doneReserve: false,
      currentStep: 0,
      date: new Date()
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
    const Icon = ({type}) => <i className={`fa fa-${type}`} />
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
                    </div>
                  )}
                  {this.state.currentStep === 2 && (
                    <div>
                      <strong>Pick Time </strong>
                    </div>
                  )}
                  {this.state.currentStep === 3 && (
                    <div>
                      <div>
                        <strong>Confirm </strong>
                      </div>
                      <div className="has-text-left">
                        <div>Date: </div>
                        <div>Stylist: </div>
                        <div>Time: </div>
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
                        <strong>
                          Congratz! Your reservation is confirmed!
                        </strong>
                      </p>
                    </div>
                  )}
                  <br />
                  {this.state.currentStep !== 4 && (
                    <div>
                      {this.state.currentStep !== 0 && (
                        <button
                          type="button"
                          className="button is-primary"
                          onClick={this.backStep}
                        >
                          Back
                        </button>
                      )}
                      {this.state.currentStep !== 3 && (
                        <button
                          type="button"
                          className="button is-warning"
                          onClick={this.nextStep}
                        >
                          Next
                        </button>
                      )}
                      {this.state.currentStep === 3 && (
                        <button
                          type="button"
                          className="button is-success"
                          onClick={this.nextStep}
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  )}
                </section>
              </div>
              <button
                className="delete is-large"
                aria-label="close"
                onClick={this.doneInfo}
              />
            </div>
          )}
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
