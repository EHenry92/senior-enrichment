import axios from 'axios';
import store from '../store';
let initialState = {
    list: [],
    campus: {}
}

//Action Types
const ADD_CAMPUS = 'ADD_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const SET_CAMPUS = 'SET_CAMPUS';
const GET_CAMPUS = 'GET_CAMPUS';

//ACTION CREATORS
    export function addCampus (campus) {
        const action = { type: ADD_CAMPUS, campus };
        return action;
    }

    export function getCampuses (campuses) {
        const action = { type: GET_CAMPUSES, campuses };
        return action;
    }

    export function deleteCampus (campusId) {
        const action = { type: DELETE_CAMPUS, campusId };
        return action;
    }

    export function editCampus (campus) {
        const action = { type: EDIT_CAMPUS, campus };
        return action;
    }

    export function getCampus (campus) {
        const action = { type: GET_CAMPUS, campus };
        return action;
    }
    export function setCampus (campus)    {
        const action = {type: SET_CAMPUS, campus};
        return action;
    }


//THUNKS
    export function fetchCampuses () {
        return function thunk (dispatch) {
            return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
        }
    }

    export function postCampus (campus) {
        return function thunk (dispatch) {
            return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                const action = addCampus(newCampus);
                dispatch(action);
            });
        }
    }
    export function destroyCampus (campusId) {
        return function thunk (dispatch) {
            return axios.delete(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(() => {
                const action = deleteCampus(campusId);
                dispatch(action);
            });
        }
    }
    export function putCampus (campusInfo) {
        return function thunk (dispatch) {
        return axios.put(`/api/campuses/${campusInfo.id}`, campusInfo)
            .then(res => res.data)
            .then(changedCampus => {
            const action = editCampus(changedCampus);
            dispatch(action);
            // socket.emit('close-campus', closdCampus);
            });
        }
    }

    export function fetchCampus (campusId) {
        return function thunk (dispatch) {
        return axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
            const action = getCampus(campus);
            dispatch(action);
            });
        }
    }
//REDUCERS

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_CAMPUS:
      return Object.assign({}, state, {
        list: [...state.list, action.campus],
        campus: action.campus
      });
    case GET_CAMPUSES:
        return Object.assign({}, state, {
            list: action.campuses
          });

    case  DELETE_CAMPUS :
      return Object.assign({}, state, {
        list: state.list.filter(campus => campus.id != action.campusId),
        campus: {}
        });
    case SET_CAMPUS:
      return Object.assign({}, state, {
        campus: action.campus
      });
    case GET_CAMPUS:
      return Object.assign({}, state, {
        campus: action.campus
      });
    case EDIT_CAMPUS:
      return Object.assign({}, state, {
        list: state.list.filter(campus => campus.id != action.campus.id),
        campus: action.campus
    });

    default:
      return state;
  }
}