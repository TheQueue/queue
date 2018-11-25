import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_APPOINTMENT = 'GET_APPOINTMENT'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const getAppointment = appointment => ({type: GET_APPOINTMENT, appointment})

/**
 * THUNK CREATORS
 */


export const fetchAppointment = () => async dispatch => {
  try {
      let appointment = await axios.get(`/api/appointments`)
    dispatch(getAppointment(appointment.data))
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
