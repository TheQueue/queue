import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BUSINESS = 'GET_BUSINESS'

/**
 * INITIAL STATE
 */
const defaultUser = []

/**
 * ACTION CREATORS
 */
const getBusiness = business => ({type: GET_BUSINESS, business})

/**
 * THUNK CREATORS
 */

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
      return action.business
    default:
      return state
  }
}
