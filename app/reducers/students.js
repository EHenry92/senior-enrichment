import axios from 'axios';

//Action Types
const ADD_STUDENT = 'ADD_STUDENT ';
const DELETE_STUDENT = 'DELETE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const EDIT_STUDENT = 'EDIT_STUDENT';

//ACTION CREATORS
    export function addStudent (student) {
        const action = { type: ADD_STUDENT, student };
        return action;
    }
    export function deleteStudent (id) {
        const action = { type: DELETE_STUDENT, id };
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
    export function destroyStudent (studentId) {        
        return function thunk (dispatch) {
            dispatch(deleteStudent(studentId));            
            return axios.delete(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(trash => {
                dispatch(deleteStudent(trash.id));
            })
            .catch((err) => console.log(err));
        }
    }

    export function putStudent (studentData) {
        return function thunk (dispatch) {
            return axios.put(`/api/students/${studentData.id}`,studentData)
            .then(res => res.data)
            .then(student => {
                const action = addStudent(student);
                dispatch(action);
            });
        }
    }

    //Reducers
    export default function reducer (students = [], action) {
  switch (action.type) {
    case ADD_STUDENT:
      return [action.student, ...students];
    
    case GET_STUDENTS:
        return action.students;

    case  DELETE_STUDENT:
      return students.filter(student => action.id !== student.id);

    case EDIT_STUDENT:
      return students.map(student => (
        action.student.id === student.id ? action.student : student
      ));

    default:
      return students;
  }
}

