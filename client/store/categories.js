import axios from 'axios'

const initialState = {
  categories: [],
  visibilityFilter: '',
  isFilterVisible: false
}

//ACTION TYPE
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
const SHOW_FILTER = 'SHOW_FILTER'
const HIDE_FILTER = 'HIDE_FILTER'

//ACTION CREATOR
const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})
export const showFilter = () => ({
  type: SHOW_FILTER
})
export const hideFilter = () => ({
  type: HIDE_FILTER
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



const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, categories: action.categories}
    case SET_VISIBILITY_FILTER:
      return {...state, visibilityFilter: action.visibility}
    case SHOW_FILTER:
      return {...state, isFilterVisible: true}
    case HIDE_FILTER:
      return {...state, isFilterVisible: false}
    default:
      return state
  }
}
// export
export default categoryReducer
