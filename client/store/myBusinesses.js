import axios from 'axios'
import { normalize, schema } from 'normalizr'

// NORMALIZER DEFINITIONS
// define reservation schema
const reservation = new schema.Entity('reservations')
// define queue schema
const queue = new schema.Entity('queues', {
  reservations: [ reservation ]
});
// define business schema
const business = new schema.Entity('businesses', {
  queues: [ queue ]
});
// define input schema
const businessList = [business];

// REDUCER CONTENT
// default
const initialState = {
  businessData: {},
  isLoading: true
}

// action types
const SET_MY_BUSINESSES_DATA = 'SET_MY_BUSINESSES_DATA'
const SET_MY_BUSINESSES_IS_LOADING_TRUE = 'SET_MY_BUSINESSES_IS_LOADING_TRUE'
const SET_MY_BUSINESSES_IS_LOADING_FALSE = 'SET_MY_BUSINESSES_IS_LOADING_FALSE'
const UPDATE_RESERVATION_AND_QUEUE = 'UPDATE_RESERVATION_AND_QUEUE'

// action creators
const setMyBusinesses = businessData => ({
  type: SET_MY_BUSINESSES_DATA,
  businessData
})
const setMyBusinessesIsLoadingTrue = () => ({
  type: SET_MY_BUSINESSES_IS_LOADING_TRUE
})
const setMyBusinessesIsLoadingFalse = () => ({
  type: SET_MY_BUSINESSES_IS_LOADING_FALSE
})
const updateReservationAndQueue = (newReservation, newQueue) => ({
  type: UPDATE_RESERVATION_AND_QUEUE,
  reservation: newReservation,
  queue: newQueue
})
// thunk creators

export const fetchMyBusinessData = () => async dispatch => {
  // user will be logged in, this route will return data based on session user id
  const {data} = await axios.get(`/api/owner/businesses`)
  // take nested JSON return -> normalize it -> set to store
  const normalizedData = normalize(data, businessList)
  dispatch(setMyBusinesses(normalizedData)) // sets business data
  dispatch(setMyBusinessesIsLoadingFalse()) // changes isLoading to false bc data was fetched
}

export const approveSingleReservation = (reservationId) => async dispatch => {
  await dispatch(setMyBusinessesIsLoadingTrue())
  const {data} = await axios.put(`/api/owner/reservations/${reservationId}?action=approve`);
  await dispatch(updateReservationAndQueue(data.reservation, data.queue))
  await dispatch(setMyBusinessesIsLoadingFalse())
}
// reducer

const myBusinessesReducer = (state = initialState, action) => {
  let newQueue, newReservation, newBusinessData;
  switch (action.type) {
    case SET_MY_BUSINESSES_DATA:
      return {...state, businessData: action.businessData}
    case SET_MY_BUSINESSES_IS_LOADING_FALSE:
      return {...state, isLoading: false}
    case SET_MY_BUSINESSES_IS_LOADING_TRUE:
      return {...state, isLoading: true}
    case UPDATE_RESERVATION_AND_QUEUE:
      // copies old state, but selectively replaces reservation and queue
      newBusinessData = {...state.businessData}
      newQueue = action.queue
      newQueue.reservations = [...state.businessData.entities.queues[newQueue.id].reservations]
      newReservation = action.reservation
      newBusinessData.entities.queues[newQueue.id] = newQueue
      newBusinessData.entities.reservations[newReservation.id] = newReservation
      return {
        ...state,
        businessData: newBusinessData
      }
    default:
      return state
  }
}
// export
export default myBusinessesReducer
