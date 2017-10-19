import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';

// const initialState = {
//   students: [],
//   campuses: [],
//   selectedCampus: {}
// }

const rootReducer = function(state = {}, action) {
  switch (action.type) {
    default: return state
  }
};

export default combineReducers({ rootReducer, students, campuses});
