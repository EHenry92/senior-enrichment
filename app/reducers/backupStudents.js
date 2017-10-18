import axios from 'axios';
import store from '../store';

let initialState = {
    students: [],
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
    const action = {type: EDIT_STUDENT, students};
    return action;
}
export function getStudent (student)   {
    const action = {type: GET_STUDENT, student};
    return action;
}
export function settudent (student)   {
    const action = {type: SET_STUDENT, student};
    return action;
}


//Reducers

export default function reducer (state = initialState, action)   {
    switch(action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, {
            students: action.students
          });
        case ADD_STUDENT:
            return Object.assign({}, state, {
                students: [...state.students, action.student],
                student: action.student
              });
        case DELETE_STUDENT:
              return Object.assign({}, state, {
                  students: students.filter(person => person.id !== action.student.id),
                  student: ""
              });
        case EDIT_STUDENT:
              return Object.assign({}, state, {
                students: students.filter(person => person.id !== action.student.id),
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

export function fetchStudent (student.id) {
    return function thunk(dispatch) {
        return axios.get(`/api/students/${student.id}`)
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
            .then(student => {
                dispatch(addStudent(student));
            })
            .catch(err => err)
    }
}

export function destroyStudent (studentId)   {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(trash => {
                dispatch(deleteStudent(trash.id));
            })
            .catch(err => err)
    }
}

export function putStudent (student)    {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${student.id}`)
            .then(res => res.data)
            .then(student => {
                dispatch(editStudent(student))
            })
            .catch(err => err)
    }
}




// import axios from 'axios';

// //Action Types
// const ADD_STUDENT = 'ADD_STUDENT ';
// const DELETE_STUDENT = 'DELETE_STUDENT';
// const GET_STUDENTS = 'GET_STUDENTS';
// const EDIT_STUDENT = 'EDIT_STUDENT';

// //ACTION CREATORS
//     export function addStudent (student) {
//         const action = { type: ADD_STUDENT, student };
//         return action;
//     }
//     export function deleteStudent (id) {
//         const action = { type: DELETE_STUDENT, id };
//         return action;
//     }
    
//     export function getStudents (students) {
//         const action = { type: GET_STUDENTS, students };
//         return action;
//     }
//     export function editStudent (student) {
//         const action = { type: EDIT_STUDENT, student };
//         return action;
//     }

// //Thunks
//     export function fetchStudents () {
//         return function thunk (dispatch) {
//             return axios.get('/api/students')
//             .then(res => res.data)
//             .then(students => {
//                 const action = getStudents(students);
//                 dispatch(action);
//             });
//         }
//     }

//     export function postStudent (studentData) {
//         return function thunk (dispatch) {
//             return axios.post('/api/students', studentData)
//             .then(res => res.data)
//             .then(student => {
//                 const action = addStudent(student);
//                 dispatch(action);
//             });
//         }
//     }
//     export function destroyStudent (studentId) {        
//         return function thunk (dispatch) {
//             dispatch(deleteStudent(studentId));            
//             return axios.delete(`/api/students/${studentId}`)
//             .then(res => res.data)
//             .then(trash => {
//                 dispatch(deleteStudent(trash.id));
//             })
//             .catch((err) => console.log(err));
//         }
//     }

//     export function putStudent (studentData) {
//         return function thunk (dispatch) {
//             return axios.put(`/api/students/${studentData.id}`,studentData)
//             .then(res => res.data)
//             .then(student => {
//                 const action = addStudent(student);
//                 dispatch(action);
//             });
//         }
//     }

//     //Reducers
//     export default function reducer (students = [], action) {
//   switch (action.type) {
//     case ADD_STUDENT:
//       return [action.student, ...students];
    
//     case GET_STUDENTS:
//         return action.students;

//     case  DELETE_STUDENT:
//       return students.filter(student => action.id !== student.id);

//     case EDIT_STUDENT:
//       return students.map(student => (
//         action.student.id === student.id ? action.student : student
//       ));

//     default:
//       return students;
//   }
// }