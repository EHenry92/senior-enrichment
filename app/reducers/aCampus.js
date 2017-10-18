import axios from 'axios';

const SET_CAMPUS = 'SET_CAMPUS';
const GET_CAMPUS = 'GET_CAMPUS';


export function getCampus (campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}
export function setCampus (campus)    {
    const action = {type: SET_CAMPUS, campus};
    return action;
}


export function fetchCampus () {
    return function thunk (dispatch) {
    return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campus => {
        const action = getCampus(campus);
        dispatch(action);
        });
    }
}


export default function reducer (campus = {}, action) {
    switch (action.type) {
      case SET_CAMPUS:
          return action.campus;
      case GET_CAMPUS:
          return action.campus;
  
      default:
        return campus;
    }
  }