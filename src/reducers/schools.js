import axios from 'axios';

// action constants
const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

// action creators
const _loadSchools = schools => {
  return {
    type: LOAD_SCHOOLS,
    schools
  }
}

const _createSchool = school => {
  return {
    type: CREATE_SCHOOL,
    school
  }
}

const _deleteSchool = school => {
  return {
    type: DELETE_SCHOOL,
    school
  }
}

const _updateSchool = school => {
  return {
    type: UPDATE_SCHOOL,
    school
  }
}

// thunks
const loadSchools = () => {
  return (dispatch) => {
    return axios.get('/api/schools')
      .then(response => response.data)
      .then(schools => dispatch(_loadSchools(schools)))
      .catch(error => console.log(error))
  }
}

const createSchool = (school) => {
  return (dispatch) => {
    return axios.post('/api/schools', school)
      .then(response => response.data)
      .then(([school, wasCreated]) => {
        // only dispatch action creator (place newly created school in store)
        // if wasCreated was true (i.e. school is unique)
        if(wasCreated) {
          dispatch(_createSchool(school))
          return wasCreated;
        }
        
        return wasCreated;
      })
      .catch(error => console.log(error))
  }
}

const deleteSchool = (school) => {
  return (dispatch) => {
    return axios.delete(`api/schools/${school.id}`)
      .then(() => dispatch(_deleteSchool(school)))
      .catch(error => console.log(error))
  }
}

const updateSchool = (school) => {
  return (dispatch) => {
    return axios.put(`api/schools/${school.id}`, school)
      .then(() => dispatch(_updateSchool(school)))
      .catch(error => console.log(error))
  }
}

// reducers
const schoolsReducer = (state = [], action) => {

  switch(action.type) {

    case LOAD_SCHOOLS:
      state = action.schools
      break;

    case CREATE_SCHOOL:
      state = [...state, action.school]
      break;

    case DELETE_SCHOOL:
      state = state.filter(school => school.id !== action.school.id)
      break;

    case UPDATE_SCHOOL:
      state = [...state]
      state = [...state.filter(school => school.id !== action.school.id), action.school]

  }

  return state.sort((a, b) => a.name > b.name);
}


export {
  schoolsReducer,
  _loadSchools,
  loadSchools,
  _createSchool,
  createSchool,
  _deleteSchool,
  DELETE_SCHOOL,
  deleteSchool,
  updateSchool,
  _updateSchool
}
