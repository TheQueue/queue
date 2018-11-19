import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BUSINESS = 'GET_BUSINESS'
const GET_DETAILS = 'GET_DETAILS'
/**
 * INITIAL STATE
 */
const defaultUser = {
  businesses: [],
  single: {}
}

/**
 * ACTION CREATORS
 */
const getBusiness = business => ({type: GET_BUSINESS, business})
const getSingleB = business => ({type: GET_DETAILS, business})
/**
 * THUNK CREATORS
 */

export const getDetails = id => async dispatch => {
  try {
    const business = (await axios.get(`/api/business/${id}`)).data
    console.log(business)
    dispatch(getSingleB(business))
  } catch (err) {
    console.log(err)
  }
}

export const thunkAllB = category => async dispatch => {
  try {
    const business = (await axios.get(`/api/business?category=${category}`))
      .data
    dispatch(getBusiness(business))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_BUSINESS:
      return {...state, businesses: action.business}
    case GET_DETAILS:
      return {...state, single: action.business}
    default:
      return state
  }
}
