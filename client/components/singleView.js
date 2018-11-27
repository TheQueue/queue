import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetails, fetchSlot} from '../store'
import {Navbar, Footer, ReservationForm, StylistCard} from './index'

function mapState(state) {
  return {
    business: state.business.single.business,
    isClosed: state.business.single.closed,
    user: state.user,
    slot: state.slot,
    image_url: state.business.single.image_url,
    price: state.business.single.price
  }
}
function mapDispatch(dispatch) {
  return {
    getB: id => dispatch(getDetails(id)),
    getSlot: () => dispatch(fetchSlot())
  }
}

class SingleBusiness extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false
      // doneReserve: false,
      // currentStep: 0
    }
    this.popup = this.popup.bind(this)
    this.doneInfo = this.doneInfo.bind(this)
  }

  componentDidMount() {
    this.props.getB(Number(this.props.match.params.id))
    this.props.getSlot()
    // const {email, phoneNumber, name} = this.props.user
    // this.setState({
    //   email,
    //   phoneNumber,
    //   name
    // })
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

  render() {
    if (
      (!this.props.business && !this.props.isClosed) ||
      this.props.business.id !== Number(this.props.match.params.id)
    ) {
      return (
        <React.Fragment>
          <Navbar />
          <div className="insideFrame">
            <div className="container title">
              <p>Loading...</p>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )
    }
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
              {}
              {this.state.isActive && (
                <ReservationForm
                  doneInfo={this.doneInfo}
                  slot={this.props.slot}
                />
              )}
            </div>
            <div className="box">
              <div className="title">
                <p>Stylists</p>
              </div>
              <div>
                {this.props.business.stylists.length > 0  ?
                  this.props.business.stylists.map(styl => (
                    <StylistCard stylist={styl} key={styl.id} />
                  )) : <p>No stylists found!</p>}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleBusiness))
