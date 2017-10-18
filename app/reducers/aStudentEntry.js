// ACTION TYPES

const ADD_STUDENT = 'ADD_STUDENT';
const GET_STUDENT = 'GET_STUDENT';


// ACTION CREATORS
export function getStudent (student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function addStudent (student) {
    const action = { type: ADD_STUDENT, student };
    return action;
}

//Thunks
export function fetchStudent (studentId) {
    return function thunk (dispatch) {
        return axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
            const action = getStudent(student);
            dispatch(action);
        });
    }
}

// REDUCER
export default function reducer (state = {}, action) {

  switch (action.type) {

    case ADD_STUDENT:
      return action.student;
    
    case GET_STUDENT:
        return action.student;

    default:
      return state;
  }

}