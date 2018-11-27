import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SLOT = 'GET_SLOT'


/**
 * INITIAL STATE
 */
const initialState =[]


/**
 * ACTION CREATORS
 */
const getSlot = slots=> ({type: GET_SLOT, slots})

/**
 * THUNK CREATORS
 */

export const fetchSlot = () => async dispatch => {
  try {
    const slots = (await axios.get(`/api/slots`)).data
    dispatch(getSlot(slots))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SLOT:
      return action.slots

    default:
      return state
  }
}
