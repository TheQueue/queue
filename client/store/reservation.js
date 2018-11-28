import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RESERVATION = 'GET_RESERVATION'
const ADD_RESERVATION = 'ADD_RESERVATION'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getReservation = reservations => ({type: GET_RESERVATION, reservations})
const addReservation = reservation => ({type: ADD_RESERVATION, reservation})

/**
 * THUNK CREATORS
 */

export const fetchReservation = () => async dispatch => {
  try {
    const reservations = (await axios.get(`/api/current`)).data
    dispatch(getReservation(reservations))
  } catch (err) {
    console.log(err)
  }
}
export const createNewReservation = reservationData => async dispatch => {
  try {
    const reservation = (await axios.post(`/api/reservation`), reservationData)
    dispatch(addReservation(reservation))
  } catch (err) {
    console.log(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATION:
      return action.reservations
    case ADD_RESERVATION:
      return [...state, action.reservation]
    default:
      return state
  }
}
