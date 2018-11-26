import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_APPOINTMENT = 'GET_APPOINTMENT'
const ADD_APPOINTMENT = 'ADD_APPOINTMENT'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const getAppointment = appointments => ({type: GET_APPOINTMENT, appointments})
const addAppointment = appointment => ({type: ADD_APPOINTMENT, appointment})
/**
 * THUNK CREATORS
 */


export const fetchAppointment = () => async dispatch => {
  try {
      let appointments = await axios.get(`/api/appointments`)
    dispatch(getAppointment(appointments.data))
  } catch (err) {
    console.log(err)
  }
}
export const createAppointment = (appointmentInfo) => async dispatch => {
  try {
      let appointment = await axios.post(`/api/appointments/add`, appointmentInfo)
    dispatch(addAppointment(appointment.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_APPOINTMENT:
      return action.appointment
    default:
      return state
  }
}
