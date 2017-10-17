import { combineReducers } from 'redux'

const initialState = {
  students: [],
  campuses: [],
  selectedCampus: {}
}

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    default: return state
  }
};

export default rootReducer
