import axios from 'axios'

//ACTION TYPE
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

//ACTION CREATOR
const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})
// const setVisibility = visibility => ({
//   type: SET_VISIBILITY_FILTER,
//   visibility
// })

//THUNK CREATOR
export const fetchCategories = () => {
  return async dispatch => {
    const {data} = await axios.get(`api/categories`)
    console.log('ZZZ', data)
    dispatch(setCategories(data))
  }
}

const initialState = {
  categories: [],
  visibilityFilter: ''
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, categories: action.categories}
    case SET_VISIBILITY_FILTER:
      return {...state, visibilityFilter: action.visibility}
    default:
      return state
  }
}
// export
export default categoryReducer
