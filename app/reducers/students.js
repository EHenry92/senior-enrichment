import axios from 'axios';

//Action Types
const ADD_STUDENT = 'ADD_STUDENT ';
const DELETE_STUDENT = 'DELETE_STUDENT';
const GET_STUDENT = 'GET_STUDENTS';
const GET_STUDENTS = 'GET_STUDENTS';
const EDIT_STUDENT = 'EDIT_STUDENT';

//ACTION CREATORS
    export function addStudent (student) {
        const action = { type: ADD_STUDENT, student };
        return action;
    }
    export function deleteStudent (student) {
        const action = { type: DELETE_STUDENT, student };
        return action;
    }
    export function getStudent (student) {
        const action = { type: GET_STUDENT, student };
        return action;
    }
    export function getStudents (students) {
        const action = { type: GET_STUDENTS, students };
        return action;
    }
    export function editStudent (student) {
        const action = { type: EDIT_STUDENT, student };
        return action;
    }

//Thunks
    export function fetchStudents () {
        return function thunk (dispatch) {
            return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
        }
    }
    export function postStudent (studentData) {
        return function thunk (dispatch) {
            return axios.post('/api/students', studentData)
            .then(res => res.data)
            .then(student => {
                const action = addStudent(student);
                dispatch(action);
            });
        }
    }
    export function destroyStudent (studentData) {
        return function thunk (dispatch) {
            return axios.delete(`/api/students/${studentData.id}`)
            .then(res => res.data)
            .then(oldStudent => {
                const action = deleteStudent(oldStudent);
                dispatch(action);
            });
        }
    }
    export function fetchStudent (studentId) {
        return function thunk (dispatch) {
            return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                const action = addStudent(student);
                dispatch(action);
            });
        }
    }
    export function putStudent (studentData) {
        return function thunk (dispatch) {
            return axios.put('/api/students')
            .then(res => res.data)
            .then(student => {
                const action = addStudent(student);
                dispatch(action);
            });
        }
    }