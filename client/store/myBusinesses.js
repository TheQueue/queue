import axios from 'axios'
import {normalize, schema} from 'normalizr'

// NORMALIZER DEFINITIONS
// user & slot
const user = new schema.Entity('users')
const slot = new schema.Entity('slots')
// define appt schema
const appointment = new schema.Entity('appointments', {
  slot: slot,
  user: user
})
// define queue schema
const stylist = new schema.Entity('stylists', {
  appointments: [appointment],
})
// define business schema
const business = new schema.Entity('businesses', {
  stylists: [stylist]
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
const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT'
const CREATE_STYLIST = 'CREATE_STYLIST'
const UPDATE_STYLIST = 'UPDATE_STYLIST'
const DELETE_STYLIST = 'DELETE_STYLIST'

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
const updateAppointmentState = updatedAppointment => ({
  type: UPDATE_APPOINTMENT,
  appointment: updatedAppointment
})
const createStylist = (newStylist) => ({
  type: CREATE_STYLIST,
  stylist: newStylist
})
const updateStylistState = updatedStylist => ({
  type: UPDATE_STYLIST,
  stylist: updatedStylist
})
const deleteStylistState = (stylistId, businessId) => ({
  type: DELETE_STYLIST,
  stylistId,
  businessId
})
// thunk creators

export const fetchMyBusinessDataThunk = () => async dispatch => {
  try {
    dispatch(setMyBusinessesIsLoadingTrue())
    // user will be logged in, this route will return data based on session user id
    const {data} = await axios.get(`/api/owner/businesses`)
    // take nested JSON return -> normalize it -> set to store
    const normalizedData = normalize(data, businessList)
    dispatch(setMyBusinesses(normalizedData)) // sets business data
    dispatch(setMyBusinessesIsLoadingFalse()) // changes isLoading to false bc data was fetched
  } catch (err) {
    console.error(err)
  }
}

export const updateSingleAppointmentThunk = (apptId, action) => async dispatch => {
  try {
    const route = `/api/owner/appointments/${apptId}?action=${action}`
    const {data} = await axios.put(route)
    dispatch(
      updateAppointmentState(data)
    )
  } catch (err) {
    console.error(err)
  }
}
export const createNewStylistThunk = (newStylist, businessId) => async dispatch => {
  try {
    newStylist.businessId = businessId
    const {data} = await axios.post(`/api/owner/stylists`, newStylist)
    dispatch(createStylist(data))
  } catch (err) {
    console.error(err)
  }
}
export const updateStylistThunk = (updatedStylist) => async dispatch => {
  try {
    const route = `/api/owner/stylists/${updatedStylist.id}`
    const {data} = await axios.put(route, updatedStylist)
    const normalizedData = normalize(data, stylist)
    const newStylist = normalizedData.entities.stylists[updatedStylist.id]
    dispatch(updateStylistState(newStylist))
  } catch (err) {
    console.error(err)
  }
}
export const deleteStylistThunk = (stylistId, businessId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/owner/stylists/${stylistId}`)
    dispatch(deleteStylistState(stylistId, businessId))
  } catch (err) {
    console.error(err)
  }
}
// reducer

const myBusinessesReducer = (state = initialState, action) => {
  let newAppointment, newBusinessData, apptId, newStylist, stylistId, businessId, stylistsArr
  switch (action.type) {
    case SET_MY_BUSINESSES_DATA:
      return {...state, businessData: action.businessData}
    case SET_MY_BUSINESSES_IS_LOADING_FALSE:
      return {...state, isLoading: false}
    case SET_MY_BUSINESSES_IS_LOADING_TRUE:
      return {...state, isLoading: true}
    case UPDATE_APPOINTMENT:
      newBusinessData = {...state.businessData}
      newAppointment = action.appointment
      apptId = newAppointment.id
      newAppointment.stylist = newAppointment.stylistId
      newAppointment.slot = newAppointment.slotId
      newAppointment.user = newAppointment.userId
      newBusinessData.entities.appointments[apptId] = newAppointment
      return {
        ...state,
        businessData: newBusinessData
      }
    case CREATE_STYLIST:
      newBusinessData = {...state.businessData}
      newStylist = action.stylist
      businessId = action.stylist.businessId
      stylistId = action.stylist.id
      newBusinessData.entities.businesses[businessId].stylists.push(stylistId)
      newBusinessData.entities.stylists[stylistId] = newStylist
      return {
        ...state,
        businessData: newBusinessData
      }
    case UPDATE_STYLIST:
      newBusinessData = {...state.businessData}
      newStylist = action.stylist
      newBusinessData.entities.stylists[newStylist.id] = newStylist
      return {
        ...state,
        businessData: newBusinessData
      }
    case DELETE_STYLIST:
      stylistId = action.stylistId
      businessId = action.businessId
      newBusinessData = {...state.businessData}
      stylistsArr = newBusinessData.entities.businesses[businessId].stylists
      newBusinessData.entities.businesses[businessId].stylists = stylistsArr.filter(id => id !== stylistId)
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
