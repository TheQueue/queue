import axios from 'axios'

// default
const initialState = {}

// action types
const SET_MY_OWN_QUEUE = 'SET_MY_OWN_QUEUE'

// action creators
const setCurrentQueue = queueData => ({
  type: SET_MY_OWN_QUEUE,
  queueData
})
// thunk creators

export const fetchCurrentQueue = businessId => async dispatch => {
  // model says businessId but it will be stored locally as userid
  const {data} = await axios.get(`/api/queue?businessId=${businessId}`)
  const action = setCurrentQueue(data)
  dispatch(action)
}
// reducer

export const currentQueueReducer = (state = initialState, action) => {
  switch (action.type) {
    case [SET_MY_OWN_QUEUE]:
      return action.queueData
    default:
      return state
  }
}
// export
export default currentQueueReducer
