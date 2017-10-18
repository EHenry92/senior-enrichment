import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';
import aStudent from './aStudentEntry';
import aCampus from './aCampus'

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

export default combineReducers({ rootReducer, students, campuses, aStudent , aCampus});
