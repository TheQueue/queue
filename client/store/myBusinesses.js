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
const UPDATE_QUEUE_AND_RESERVATIONS = 'UPDATE_QUEUE_AND_RESERVATIONS'

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

const updateQueueAndReservationsNormalized = (entities) => ({
  type: UPDATE_QUEUE_AND_RESERVATIONS,
  queues: entities.queues,
  reservations: entities.reservations
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

export const approveSingleReservation = (reservationId, waitTime) => async dispatch => {
  await dispatch(setMyBusinessesIsLoadingTrue())
  const request = {waitTime}
  const {data} = await axios.put(`/api/owner/reservations/${reservationId}?action=approve`, request);
  // normalizes data and updates store
  await dispatch(updateQueueAndReservationsNormalized(normalize(data, queue).entities))
  await dispatch(setMyBusinessesIsLoadingFalse())
}

export const markReservationAsServed = (reservationId) => async dispatch => {
  await dispatch(setMyBusinessesIsLoadingTrue())
  const {data} = await axios.put(`/api/owner/reservations/${reservationId}?action=serve`);
  console.log(data);
  // normalizes data and updates store
  await dispatch(updateQueueAndReservationsNormalized(normalize(data, queue).entities))
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
    case UPDATE_QUEUE_AND_RESERVATIONS:
      // copies old state, but selectively replaces reservation and queue
      newBusinessData = {...state.businessData}
      newQueue = action.queues
      newReservation = action.reservations
      newBusinessData.entities.queues = newQueue
      newBusinessData.entities.reservations = newReservation
      // !! this reducer function only keeps data from the my-business-detail view !!
      // front end needs to refetch all data again when rendering my-businesses
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
