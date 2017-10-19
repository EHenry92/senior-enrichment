import axios from 'axios';

let initialState = {
    list: [],
    student: {}
}

//Action Types
const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
const GET_STUDENT = 'GET_STUDENT';
const SET_STUDENT = 'SET_STUDENT';


//Action Creator
export function getStudents (students)   {
    const action = {type: GET_STUDENTS, students};
    return action;
}
export function deleteStudent (studentId)   {
    const action = {type: DELETE_STUDENT, studentId};
    return action;
}
export function addStudent (student)   {
    const action = {type: ADD_STUDENT, student};
    return action;
}
export function editStudent (student)   {
    console.log("the student ifno", student)
    const action = {type: EDIT_STUDENT, student};
    return action;
}
export function getStudent (student)   {
    const action = {type: GET_STUDENT, student};
    return action;
}
export function setStudent (student)   {
    const action = {type: SET_STUDENT, student};
    return action;
}


//Reducers

export default function reducer (state = initialState, action)   {
    switch (action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, {
            list: action.students
          });
        case ADD_STUDENT:
            return Object.assign({}, state, {
                list: [...state.list, action.student],
                student: action.student
              });
        case DELETE_STUDENT:
              return Object.assign({}, state, {
                    list: state.list.filter(person => person.id != action.studentId),
                  student: {}
              });
        case EDIT_STUDENT:
              return Object.assign({}, state, {
                list: [...state.list.filter(person => person.id != action.studentId),action.student],
                student: action.student
            });
        case GET_STUDENT:
            return Object.assign({}, state, {
            student: action.student
          });
        case SET_STUDENT:
          return Object.assign({}, state, {
              student: action.student
            });
        default:
        return state;
    }
}

//Thunks
export function fetchStudents ()    {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                dispatch(getStudents(students));
            })
            .catch(err => err)
    }
}

export function fetchStudent (studentId) {
    return function thunk(dispatch) {
        return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                dispatch(getStudent(student));
            })
            .catch(err => err)
    }
}

export function postStudent (student)   {
    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                dispatch(addStudent(newStudent));
            })
            .catch(err => err)
    }
}

export function destroyStudent (studentId)   {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(() => {
                dispatch(deleteStudent(studentId));
            })
            .catch(err => err)
    }
}

export function putStudent (student)    {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${student.id}`,student)
            .then(res => res.data)
            .then(editedStudent => {
                dispatch(editStudent(editedStudent[1]))
            })
            .catch(err => err)
    }
}