import axios from 'axios'
import {normalize, schema} from 'normalizr'

// NORMALIZER DEFINITIONS
// define reservation schema
const reservation = new schema.Entity('reservations')
// define queue schema
const queue = new schema.Entity('queues', {
  reservations: [reservation]
})
// define business schema
const business = new schema.Entity('businesses', {
  queues: [queue]
})
// define input schema
const businessList = [business]

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

// thunk creators

export const fetchMyBusinessData = () => async dispatch => {
  // user will be logged in, this route will return data based on session user id
  const {data} = await axios.get(`/api/owner/businesses`)
  // take nested JSON return -> normalize it -> set to store
  const normalizedData = normalize(data, businessList)
  dispatch(setMyBusinesses(normalizedData)) // sets business data
  dispatch(setMyBusinessesIsLoadingFalse()) // changes isLoading to false bc data was fetched
}
// reducer

const myBusinessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_BUSINESSES_DATA:
      return {...state, businessData: action.businessData}
    case SET_MY_BUSINESSES_IS_LOADING_FALSE:
      return {...state, isLoading: false}
    case SET_MY_BUSINESSES_IS_LOADING_TRUE:
      return {...state, isLoading: true}

    default:
      return state
  }
}
// export
export default myBusinessesReducer
