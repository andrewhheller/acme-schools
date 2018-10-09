const expect = require('chai').expect;

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';

import {
  _loadSchools,
  _createSchool,
  _updateSchool,
  _deleteSchool,
  loadSchools,
  createSchool,
  schoolsReducer } from '../src/reducers/schools';

import {
  _loadStudents,
  _createStudent,
  _updateStudent,
  _deleteStudent,
  studentsReducer } from '../src/reducers/students';



const mockStore = configureMockStore([ thunk ]); 




// action creators

describe('action creators', () => {

  describe('schools', () => {

    it('LOAD SCHOOLS:  returns action type LOAD_SCHOOLS and payload of schools', () => {
      const type = 'LOAD_SCHOOLS';
      const schools = ['school1', 'school2', 'school3'];
      const action = { type, schools }
      expect(_loadSchools(schools)).to.eql(action);
    })

    it('CREATE SCHOOL:  returns action type CREATE SCHOOL and payload of school', () => {
      const type = 'CREATE_SCHOOL';
      const school = { name: 'school4' };
      const action = { type, school };
      expect(_createSchool(school)).to.eql(action);
    })

    it('UPDATE SCHOOLS:  returns type UPDATE_SCHOOL and payload of updated school data', () => {
      const type = 'UPDATE_SCHOOL';
      const school = { name: 'school1a' };
      const action = { type, school }
      expect(_updateSchool(school)).to.eql(action);
    })

    it('DELETE SCHOOL:  returns type DELETE_SCHOOL and paylood of school to be deleted', () => {
      const type = 'DELETE_SCHOOL';
      const school = { name: 'school1' }
      const action = { type, school }
      expect(_deleteSchool(school)).to.eql(action);
    })

  })

  describe('students', () => {

    it('LOAD STUDENTS:  returns action type LOAD_STUDENTS and payload of students', () => {
      const type = 'LOAD_STUDENTS';
      const students = ['student1', 'student2', 'student3'];
      const action = { type, students }
      expect(_loadStudents(students)).to.eql(action);
    })

    it('CREATE STUDENT:  returns action type CREATE STUDENTS and payload of student', () => {
      const type = 'CREATE_STUDENT';
      const student = { name: 'studentX' };
      const action = { type, student };
      expect(_createStudent(student)).to.eql(action);
    })

    it('UPDATE STUDENTS:  returns type UPDATE_STUDENT and payload of updated student data', () => {
      const type = 'UPDATE_STUDENT';
      const student = { name: 'studentY' };
      const action = { type, student }
      expect(_updateStudent(student)).to.eql(action);
    })

    it('DELETE STUDENT:  returns type STUDENT and paylood of student to be deleted', () => {
      const type = 'DELETE_STUDENT';
      const student = { name: 'studentX' }
      const action = { type, student }
      expect(_deleteStudent(student)).to.eql(action);
    })

  })

})


// reducers

describe('reducers', () => {

  describe('schools reducer', () => {

    it('loads the schools', () => {
      const state = [];
      const schools = [{ name: 'school1' }, { name: 'school2' }, { name: 'school3' }];
      const action = { type: 'LOAD_SCHOOLS', schools }
      expect(schoolsReducer(state, action)).to.eql(schools);
    })

    it('can create a school', () => {
      const state = [];
      const school = { name: 'school4' }
      const action = { type: 'CREATE_SCHOOL', school }
      expect(schoolsReducer(state, action)).to.eql([ school ]);
    })

    it('can update a school', () => {
      const state = [ { id: 1, name: 'school1' }, { id: 2, name: 'school2' }, { id: 3, name: 'school3' } ];
      const school = { id: 1, name: 'schoolX' }
      const action = { type: 'UPDATE_SCHOOL', school }
      const schools = schoolsReducer(state, action);
      expect(schools.find(school => school.id === 1).name).to.contain('schoolX');
      expect(schools.find(school => school.id === 1).name).to.not.contain('school1');
    })

    it('can delete a school', () => {
      const state = [ { id: 1, name: 'school1' }, { id: 2, name: 'school2' }, { id: 3, name: 'school3' } ];
      const school = { id: 1, name: 'school1' }
      const action = { type: 'DELETE_SCHOOL', school }
      const schools = schoolsReducer(state, action);
      expect(schools.some(school => school.id === 1)).to.equal(false)
    })

  })


})

// thunks


describe ('thunks', () => {

  describe('load schools thunk', () => {

    let stub;

    beforeEach(() => {
      stub = sinon.stub(axios, 'get').returns(Promise.resolve({
          data: ['school1', 'school2', 'school3']
        })
      );
    })

    afterEach(() => stub.restore())

    it('dispatches _loadSchools action creator (LOAD_SCHOOLS action constant)', () => {
      const store = mockStore();
      return store.dispatch(loadSchools())
        .then(() => {
          expect(stub.getCall(0).args).to.eql(['/api/schools'])
          expect(store.getActions()).to.eql([{
            type: 'LOAD_SCHOOLS',
            schools: ['school1', 'school2', 'school3']
          }])
        })
    });

  })


  // describe('create school thunk', () => {

  //   let stub;

  //   beforeEach(() => {
  //     const school = { name: 'school4' }
  //     stub = sinon.stub(axios, 'post').withArgs('/save', school).returns(Promise.resolve({
  //       data: { name: 'school4' }
  //     }))
  //   })

    // afterEach(() => stub.restore())

  //   it('dispatches _createSchool action creator (CREATE_SCHOOL) action constant', () => {
  //     const store = mockStore();
  //     return store.dispatch(createSchool())
  //       .then(() => {
  //         console.log(store.getActions())
  //         expect(store.getActions()).to.eql([{
  //           type: 'CREATE_SCHOOL',
  //           school: { name: 'school4' }
  //         }])
  //       })
  //   })


  // })


})
