import { DELETE_SCHOOL } from './schools';

import axios from 'axios';


// action constants
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

// action creators
const _loadStudents = students => {
  return {
    type: LOAD_STUDENTS,
    students
  }
}

const _createStudent = student => {
  return {
    type: CREATE_STUDENT,
    student
  }
}

const _deleteStudent = student => {
  return {
    type: DELETE_STUDENT,
    student
  }
}

const _updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}

// thunks
const loadStudents = () => {
  return (dispatch) => {
    axios.get('/api/students')
      .then(response => response.data)
      .then(students => dispatch(_loadStudents(students)))
      .catch(error => console.log(error))
  }
}

const createStudent = (student) => {
  return (dispatch) => {
    return axios.post('/api/students', student)
      .then(response => response.data)
      .then(student => dispatch(_createStudent(student)))
      .catch(error => console.log(error))
  }
}

const deleteStudent = (student) => {
  return (dispatch) => {
    return axios.delete(`/api/students/${student.id}`)
      .then(() => dispatch(_deleteStudent(student)))
      .catch(error => next(error))
  }
}

const updateStudent = (student) => {
  return (dispatch) => {
    return axios.put(`/api/students/${student.id}`, student)
      .then(() => dispatch(_updateStudent(student)))
      .catch(error => console.log(error))
  }
}

// reducer
const studentsReducer = (state = [], action) => {

  switch(action.type) {

    case LOAD_STUDENTS:
      state = action.students
      break;

    case CREATE_STUDENT:
      state = [...state, action.student]
      break;

    case DELETE_STUDENT:
      state = state.filter(student => student.id !== action.student.id)
      break;

    case DELETE_SCHOOL:
      state = [...state]
      state.forEach(student => {
        if(student.schoolId == action.school.id) {
          student.schoolId = null
        }
      })
      break;

    case UPDATE_STUDENT:
      state = [...state]
      state = [...state.filter(student => student.id !== action.student.id), action.student]
      break;
  }

  return state.sort((a, b) => a.firstName > b.firstName);
}

export {
  studentsReducer,
  _loadStudents,
  _createStudent,
  _updateStudent,
  _deleteStudent,
  loadStudents,
  createStudent,
  deleteStudent,
  updateStudent
}
