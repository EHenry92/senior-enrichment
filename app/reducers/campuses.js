import axios from 'axios';
import store from '../store';

//Action Types
const ADD_CAMPUS = 'ADD_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';

//ACTION CREATORS
    export function addCampus (campus) {
        const action = { type: ADD_CAMPUS, campus };
        return action;
    }

    export function getCampuses (campuses) {
        const action = { type: GET_CAMPUSES, campuses };
        return action;
    }

    export function deleteCampus (id) {
        const action = { type: DELETE_CAMPUS, id };
        return action;
    }

    export function editCampus (campus) {
        const action = { type: EDIT_CAMPUS, campus };
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

    export function postCampus () {
        return function thunk (dispatch) {
            return axios.post('/api/campuses', store.state.campus)
            .then(res => res.data)
            .then(newCampus => {
                const action = addCampus(newCampus);
                dispatch(action);
            });
        }
    }
    export function destroyCampus (campus) {
        return function thunk (dispatch) {
            return axios.delete(`/api/campuses/${campus.id}`)
            .then(res => res.data)
            .then(closedCampus => {
                const action = deleteCampus(closedCampus.id);
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
            // socket.emit('close-campus', closedCampus);
            });
        }
    }
//REDUCERS

export default function reducer (campuses = [], action) {
  switch (action.type) {
    case ADD_CAMPUS:
      return [action.campus, ...campuses];
    case GET_CAMPUSES:
        return action.campuses;

    case  DELETE_CAMPUS :
      return campuses.filter(campus => campus.id !== action.id);

    case EDIT_CAMPUS:
      return campuses.map(campus => (
        action.campus.id === campus.id ? action.campus : campus
      ));

    default:
      return campuses;
  }
}

