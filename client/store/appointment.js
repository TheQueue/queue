import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_APPOINTMENTS = 'GET_APPOINTMENTS'
const ADD_APPOINTMENT = 'ADD_APPOINTMENT'
const USER_APPOINTMENT = "USER_APPPOINTMENT"
const CANCEL_APPOINTMENT = "CANCEL_APPOINTMENT"
/**
 * INITIAL STATE
 */
const defaultState = []
/**
 * ACTION CREATORS
 */
const getAppointment = appointments => ({type: GET_APPOINTMENTS, appointments})
const getUserAppointment = appointment =>({type: USER_APPOINTMENT, appointment})
const addAppointment = appointment => ({type: ADD_APPOINTMENT, appointment})
const cancelAppointment = appointment => ({type: CANCEL_APPOINTMENT, appointment})
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

export const fetchUserAppointment = () => async dispatch => {
  try {
      let appointment = await axios.get(`/api/appointments/user`)
    dispatch(getUserAppointment(appointment.data))
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
export const updateAppointment = (appointmentInfo) => async dispatch => {
  try {
      let appointment = await axios.put(`/api/appointments/`, appointmentInfo)
    dispatch(cancelAppointment(appointment.data))
  } catch (err) {
    console.log(err)
  }
}



/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return action.appointments
    case USER_APPOINTMENT:
      return action.appointment
    case ADD_APPOINTMENT:
      return [...state, ...action.appointment]
    case CANCEL_APPOINTMENT:
      return [...state].filter(a => a.id !== action.appointment.id)
    default:
      return state
  }
}
