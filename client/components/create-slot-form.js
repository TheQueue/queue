import React, {Component} from 'react'
import {createSlotThunk} from '../store'
import {connect} from 'react-redux'
import moment from 'moment'
class CreateSlotForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: props.date,
      time: '9:00AM',
      stylistId: NaN,
    }
  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    // this.props.dispatchFunc(this.state, this.props.businessId)
    this.setState({
      date: this.props.date,
      time: '9:00AM',
      stylistId: NaN
    })
    const slotData = {
      date: this.state.date,
      time: this.state.time,
      stylistId: this.state.stylistId
    }
    console.log(slotData)
    try {
      this.props.createSlotThunk(slotData)
      this.props.toggleForm()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {toggleForm, isActive, stylists} = this.props
    const stylArr = Object.values(stylists)
    const {date, time, stylistId} = this.state
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    const modalActiveClass = isActive ? 'is-active' : null
    const canSubmit = date && time && stylistId
    const displayDate = moment(this.state.date).format('MMM Do YY')
    return (
      <div className={`modal ${modalActiveClass}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create New Slot</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={toggleForm}
            />
          </header>
          <section className="modal-card-body">
            <div className="box is-centered">
              <form>
                <div className="control">
                  <label htmlFor="date">Date:
                    <input
                      onChange={handleChange}
                      value={displayDate}
                      className="input"
                      type="text"
                      name="date"
                      placeholder="Date"
                      disabled = {true}
                    />
                  </label>
                </div>
                <div className="control">
                  <label htmlFor="time">Time:
                    <input
                      onChange={handleChange}
                      value={time}
                      className="input"
                      type="text"
                      name="time"
                      placeholder="Time"
                    />
                  </label>
                </div>
                <div className="control select">
                  <select name="stylistId" onChange={handleChange}>
                    <option value={NaN} />
                    {stylArr.map(styl => (
                      <option key={styl.id} value={styl.id}>{styl.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="button is-block is-info is-large is-fullwidth"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  Submit
                </button>
                {/* {error && error.response && <div> {error.response.data} </div>} */}
              </form>
            </div>
          </section>
        </div>
      </div>
    )
  }
}


const mapDispatch = (dispatch) => ({
  createSlotThunk: (slotData) => dispatch(createSlotThunk(slotData))
})
export default connect(null, mapDispatch)(CreateSlotForm)
