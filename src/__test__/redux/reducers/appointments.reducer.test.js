import {
  GET_USER_APPOINTMENTS_LIST, GET_TEACHER_APPOINTMENTS_LIST,
  ADD_APPOINTMENT, REMOVE_APPOINTMENT,
  SIGN_OUT,
} from '../../../redux/actions/types';
import appointmentsReducer from '../../../redux/reducers/appointments.reducer';

jest.setTimeout(30000);

describe('Tests for Appointments reducer', () => {
  let initialState;

  //
  beforeEach(() => {
    initialState = {
      list: [],
    };
  });

  //
  test('Test for ADD_APPOINTMENT', () => {
    const newPayload = {
      appointment: {
        teacher_id: 1,
        scheduled_for: '2021-01-07 08:00',
      },
    };
    const newAction = {
      type: ADD_APPOINTMENT,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        teacher_id: 1,
        scheduled_for: '2021-01-07 08:00',
      }],
    };

    const newState = appointmentsReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for REMOVE_APPOINTMENT', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        scheduled_for: '2021-01-07 08:00',
      },
    );
    const newPayload = {
      appointment: {
        id: 1,
        scheduled_for: '2021-01-07 08:00',
      },
    };
    const newAction = {
      type: REMOVE_APPOINTMENT,
      payload: newPayload,
    };
    const expectedState = {
      ...newInitialState,
      list: [],
    };

    const newState = appointmentsReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_TEACHER_APPOINTMENTS_LIST', () => {
    const newPayload = {
      appointments: [{
        id: 1,
        scheduled_for: '2021-01-07 08:00',
        user_fullname: 'Naruto Uzumaki',
        course: 'How to become a Ninja... for jerks.',
        status: 0,
      }],
    };
    const newAction = {
      type: GET_TEACHER_APPOINTMENTS_LIST,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        scheduled_for: '2021-01-07 08:00',
        user_fullname: 'Naruto Uzumaki',
        course: 'How to become a Ninja... for jerks.',
        status: 0,
      }],
    };

    const newState = appointmentsReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_USER_APPOINTMENTS_LIST', () => {
    const newPayload = {
      appointments: [{
        id: 1,
        scheduled_for: '2021-01-07 08:00',
        teacher_fullname: 'Stephen Hawking',
        course: 'Black holes in the Universe',
        status: 1,
      }],
    };
    const newAction = {
      type: GET_USER_APPOINTMENTS_LIST,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        scheduled_for: '2021-01-07 08:00',
        teacher_fullname: 'Stephen Hawking',
        course: 'Black holes in the Universe',
        status: 1,
      }],
    };

    const newState = appointmentsReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for DEFAULT', () => {
    const newState = appointmentsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Test for SIGN_OUT', () => {
    const newAction = {
      type: SIGN_OUT,
    };

    const newState = appointmentsReducer(undefined, newAction);
    expect(newState).toEqual(initialState);
  });
});
