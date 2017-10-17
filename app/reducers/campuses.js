import axios from 'axios';

//Action Types
const ADD_CAMPUS = 'ADD_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
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

    export function getCampus (campus) {
        const action = { type: GET_CAMPUS, campus };
        return action;
    }

    export function deleteCampus (campus) {
        const action = { type: DELETE_CAMPUS, campus };
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
    export function postCampus (campus) {

    return function thunk (dispatch) {
        return axios.post('/api/campuses', campus)
        .then(res => res.data)
        .then(newCampus => {
            const action = addCampus(newCampus);
            dispatch(action);
            // socket.emit('new-campus', newCampus);
        });
    }
    }
    export function destroyCampus (campus) {
        return function thunk (dispatch) {
            return axios.delete(`/api/campuses/${campus.id}`)
            .then(res => res.data)
            .then(closedCampus => {
                const action = addCampus(closedCampus);
                dispatch(action);
                // socket.emit('close-campus', closedCampus);
            });
        }
    }
    export function putCampus (campusInfo) {
        return function thunk (dispatch) {
        return axios.put(`/api/campuses/${campus.id}`, campusInfo)
            .then(res => res.data)
            .then(closedCampus => {
            const action = editCampus(closedCampus);
            dispatch(action);
            // socket.emit('close-campus', closedCampus);
            });
        }
    }
//REDUCERS
