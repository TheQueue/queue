import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BUSINESS = 'GET_BUSINESS'
const GET_DETAILS = 'GET_DETAILS'
const GET_BUSINESS_BY_SEARCH = 'GET_BUSINESS_BY_SEARCH'
const CLEAR_BUSINESS_SEARCH = 'CLEAR_BUSINESS_SEARCH'
/**
 * INITIAL STATE
 */
const defaultBusiness = {
  businesses: [],
  single: {}
}

/**
 * ACTION CREATORS
 */
const getBusiness = business => ({type: GET_BUSINESS, business})
const getSingleB = business => ({type: GET_DETAILS, business})
const getBusinessBySearch = businesses => ({
  type: GET_BUSINESS_BY_SEARCH,
  businesses
})
export const clearBusinessSearch = () => ({
  type: CLEAR_BUSINESS_SEARCH
})
/**
 * THUNK CREATORS
 */
export const searchBusiness = keyword => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/business/search/${keyword}`)
      dispatch(getBusinessBySearch(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const getDetails = id => async dispatch => {
  try {
    const business = (await axios.get(`/api/business/${id}`)).data
    dispatch(getSingleB(business))
  } catch (err) {
    console.log(err)
  }
}

export const thunkAllB = category => async dispatch => {
  try {
    const response = category
      ? await axios.get(`/api/business?category=${category}`)
      : await axios.get(`/api/business`)
    dispatch(getBusiness(response.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultBusiness, action) {
  switch (action.type) {
    case GET_BUSINESS:
      return {...state, businesses: action.business}
    case GET_DETAILS:
      return {...state, single: action.business}
    case GET_BUSINESS_BY_SEARCH:
      return {...state, businesses: action.businesses}
    case CLEAR_BUSINESS_SEARCH:
      return defaultBusiness
    default:
      return state
  }
}
