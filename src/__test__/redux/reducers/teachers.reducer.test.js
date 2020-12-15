import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO,
  GET_TEACHER_AVAILABILITY, CLEAR_TEACHER_AVAILABILITY,
  ADD_TEACHER, UPDATE_TEACHER, UPDATE_TEACHER_N_REDIRECT, REMOVE_TEACHER,
  SIGN_OUT,
} from '../../../redux/actions/types';
import teachersReducer from '../../../redux/reducers/teachers.reducer';

jest.setTimeout(30000);

describe('Tests for Teachers reducer', () => {
  let initialState;

  //
  beforeEach(() => {
    initialState = {
      list: [],
    };
  });

  //
  test('Test for GET_TEACHER_AVAILABILITY', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    );
    const newPayload = {
      teacher: {
        id: 1,
        availability: [8, 9, 10, 11, 12, 15, 16, 17],
      },
    };
    const newAction = {
      type: GET_TEACHER_AVAILABILITY,
      payload: newPayload,
    };
    const expectedState = {
      ...newInitialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
        availability: [8, 9, 10, 11, 12, 15, 16, 17],
      }],
    };

    const newState = teachersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_TEACHER_AVAILABILITY', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
        availability: [8, 9, 10, 11, 12, 15, 16, 17],
      },
    );
    const newAction = {
      type: CLEAR_TEACHER_AVAILABILITY,
      payload: CLEAR_TEACHER_AVAILABILITY,
    };
    const expectedState = {
      ...newInitialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };

    const newState = teachersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for ADD_TEACHER', () => {
    const newPayload = {
      teacher: {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    };
    const newAction = {
      type: ADD_TEACHER,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };

    const newState = teachersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for UPDATE_TEACHER', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        fullname: 'Myke deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Maths',
        description: 'Limits, Derivatives and Integrals',
      },
    );

    const newPayload = {
      teacher: {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    };
    const newAction = {
      type: UPDATE_TEACHER,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };

    const newState = teachersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for UPDATE_TEACHER_N_REDIRECT', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        fullname: 'Myke deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Maths',
        description: 'Limits, Derivatives and Integrals',
      },
    );

    const newPayload = {
      teacher: {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    };
    const newAction = {
      type: UPDATE_TEACHER_N_REDIRECT,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };

    const newState = teachersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for REMOVE_TEACHER', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    );

    const newPayload = {
      teacher: {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    };
    const newAction = {
      type: REMOVE_TEACHER,
      payload: newPayload,
    };
    const expectedState = {
      ...newInitialState,
      list: [],
    };

    const newState = teachersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_TEACHER_INFO', () => {
    const newPayload = {
      teacher: {
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      },
    };
    const newAction = {
      type: GET_TEACHER_INFO,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };

    const newState = teachersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_TEACHERS_LIST', () => {
    const newPayload = {
      teachers: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };
    const newAction = {
      type: GET_TEACHERS_LIST,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        fullname: 'Neil deGrasse Tyson',
        email: 'admin@sudo.com',
        course: 'Physics',
        description: 'Pulsars and Magnetars',
      }],
    };

    const newState = teachersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for DEFAULT', () => {
    const newState = teachersReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Test for SIGN_OUT', () => {
    const newAction = {
      type: SIGN_OUT,
    };

    const newState = teachersReducer(undefined, newAction);
    expect(newState).toEqual(initialState);
  });
});
