import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STYLISTSLOTS = 'GET_STYLISTSLOTS'
const BOOK_STYLISTSLOT = "BOOK_STYLISTSLOT"
/**
 * INITIAL STATE
 */
const defaultState = []
/**
 * ACTION CREATORS
 */
const getStylistSlot = stylistSlots => ({type: GET_STYLISTSLOTS , stylistSlots})
const bookStylistSlot = stylistSlots => ({type: BOOK_STYLISTSLOT, stylistSlots})
/**
 * THUNK CREATORS
 */


export const fetchStylistSlot = (stylistId) => async dispatch => {
  try {
      let stylistslot = await axios.get(`/api/stylistSlot/${stylistId}`, stylistId)
    dispatch(getStylistSlot(stylistslot.data))
  } catch (err) {
    console.log(err)
  }
}

export const updateStylistSlot = (stylistSlotInfo) => async dispatch => {
  try {
      let stylistSlot = await axios.put(`/api/stylistSlot/`, stylistSlotInfo)
    dispatch(bookStylistSlot(stylistSlot.data))
  } catch (err) {
    console.log(err)
  }
}



/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_STYLISTSLOTS:
      return action.stylistSlots
    case BOOK_STYLISTSLOT:
      return [...state].filter(a => a.id !== action.stylistSlots.id)
    default:
      return state
  }
}
