import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createNewStylist} from '../store'

// using DRY format from auth-form

const mapStateAdd = state => ({
  formType: 'create'
})

const mapDispatchAdd = dispatch => ({
  dispatchFunc: (stylist, businessId) => dispatch(createNewStylist(stylist, businessId))
})

const mapStateEdit = state => ({
  formType: 'edit'
})
const mapDispatchEdit = dispatch => ({
  dispatchFunc: (stylist, businessId) => dispatch(createNewStylist(stylist, businessId))
})



class StylistForm extends Component {
  constructor(props) {
    super(props)
    if (props.formType === 'edit') {
      this.state = {
        name: props.stylist.name,
        email: props.stylist.email,
        phoneNumber: props.stylist.phoneNumber,
        imageUrl: props.stylist.imageUrl || '',
        formHeader: 'Edit Stylist Information'
      }
    } else {
      this.state = {
        name: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        formHeader: 'Add A New Stylist'
     }
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const toggleAddStylist = this.props.toggleAddStylist;
    this.props.dispatchFunc(this.state, this.props.businessId)
    toggleAddStylist()
  }
  render() {
    const {isActive, toggleAddStylist, businessId} = this.props
    const modalActiveClass = (isActive) ? 'is-active' : null
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    const {name, email, phoneNumber, imageUrl, formHeader} = this.state

    return (
      <div className={`modal ${modalActiveClass}`}>
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{formHeader}</p>
            <button type="button" className="delete" aria-label="close"  onClick = {toggleAddStylist}/>
          </header>
          <section className="modal-card-body">
            <div className="box is-centered">
              <form name={name}>
                <div className="control">
                  <label htmlFor="name">
                    <input
                      onChange={handleChange}
                      value={name}
                      className="input is-large"
                      type="text"
                      name="name"
                      placeholder="Name"
                      autoFocus=""
                    />
                  </label>
                </div>
                <div className="control">
                  <label htmlFor="email">
                    <input
                      onChange={handleChange}
                      value={email}
                      className="input is-large"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </label>
                </div>
                <div className="control">
                  <label htmlFor="phoneNumber">
                    <input
                      onChange={handleChange}
                      value={phoneNumber}
                      className="input is-large"
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                    />
                  </label>
                </div>
                <div className="control">
                  <label htmlFor="email">
                    <input
                      onChange={handleChange}
                      value={imageUrl}
                      className="input is-large"
                      type="text"
                      name="imageUrl"
                      placeholder="Image URL"
                    />
                  </label>
                </div>
                <button
                  className="button is-block is-info is-large is-fullwidth"
                  type="submit"
                  onClick={handleSubmit}
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

export const AddStylist = connect(mapStateAdd, mapDispatchAdd)(StylistForm)
export const EditStylist = connect(mapStateEdit, mapDispatchEdit)(StylistForm)
