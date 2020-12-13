import {
  SIGN_IN_REQUEST, GET_SESSION, SIGN_OUT,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER, UPDATE_USER_N_REDIRECT, REMOVE_USER,
} from '../../../redux/actions/types';
import usersReducer from '../../../redux/reducers/users.reducer';

describe('Tests for Users reducer', () => {
  let initialState;

  //
  beforeEach(() => {
    initialState = {
      list: [],
      myProfile: {
        signedIn: false,
      },
    };
  });

  //
  test('Test for DEFAULT', () => {
    const newState = usersReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Test for GET_SESSION', () => {
    const newPayload = {
      signedIn: true,
    };
    const newAction = {
      type: GET_SESSION,
      payload: newPayload,
    };
    const expectedState = {
      list: [],
      myProfile: {
        signedIn: newPayload.signedIn,
      },
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for SIGN_IN_REQUEST', () => {
    const newPayload = {
      signedIn: true,
    };
    const newAction = {
      type: SIGN_IN_REQUEST,
      payload: newPayload,
    };
    const expectedState = {
      list: [],
      myProfile: {
        signedIn: true,
      },
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for SIGN_OUT', () => {
    const newAction = {
      type: SIGN_OUT,
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(initialState);
  });

  test('Test for GET_USERS_LIST', () => {
    const newPayload = {
      users: [{
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.com',
      }],
    };
    const newAction = {
      type: GET_USERS_LIST,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.com',
      }],
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_USER_INFO', () => {
    const newPayload = {
      user: {
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
      },
    };
    const newAction = {
      type: GET_USER_INFO,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      list: [{
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
      }],
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for GET_MY_PROFILE', () => {
    const newPayload = {
      myprofile: {
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
      },
    };
    const newAction = {
      type: GET_MY_PROFILE,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      myProfile: {
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
        signedIn: initialState.myProfile.signedIn,
      },
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for ADD_USER', () => {
    const newAction = {
      type: ADD_USER,
    };

    const newState = usersReducer(undefined, newAction);
    expect(newState).toEqual(initialState);
  });

  test('Test for UPDATE_USER', () => {
    const newInitialState = { ...initialState };
    newInitialState.myProfile = {
      id: 1,
      username: 'admin',
      fullname: 'Super Administrator',
      email: 'admin@sudo.dev',
      signedIn: true,
    };
    newInitialState.list.push(
      {
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
      },
    );

    const newPayload = {
      user: {
        id: 1,
        username: 'admin',
        fullname: 'Super Duper Hyper Administrator',
        email: 'admin@sudo.com',
      },
    };
    const newAction = {
      type: UPDATE_USER,
      payload: newPayload,
    };
    const expectedState = {
      ...initialState,
      myProfile: {
        id: 1,
        username: 'admin',
        fullname: 'Super Duper Hyper Administrator',
        email: 'admin@sudo.com',
        signedIn: true,
      },
      list: [{
        id: 1,
        username: 'admin',
        fullname: 'Super Duper Hyper Administrator',
        email: 'admin@sudo.com',
      }],
    };

    const newState = usersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for UPDATE_USER_N_REDIRECT', () => {
    const newInitialState = { ...initialState };
    newInitialState.myProfile = {
      id: 1,
      username: 'admin',
      fullname: 'Super Administrator',
      email: 'admin@sudo.dev',
      signedIn: true,
    };

    const newPayload = {
      user: {
        id: 1,
        username: 'admin',
        fullname: 'Super Duper Hyper Administrator',
        email: 'admin@sudo.com',
      },
    };
    const newAction = {
      type: UPDATE_USER_N_REDIRECT,
      payload: newPayload,
    };
    const expectedState = {
      ...newInitialState,
      myProfile: {
        id: 1,
        username: 'admin',
        fullname: 'Super Duper Hyper Administrator',
        email: 'admin@sudo.com',
        signedIn: true,
      },
    };

    const newState = usersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });

  test('Test for REMOVE_USER', () => {
    const newInitialState = { ...initialState };
    newInitialState.list.push(
      {
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
      },
    );

    const newPayload = {
      user: {
        id: 1,
        username: 'admin',
        fullname: 'Super Administrator',
        email: 'admin@sudo.dev',
      },
    };
    const newAction = {
      type: REMOVE_USER,
      payload: newPayload,
    };
    const expectedState = {
      ...newInitialState,
      list: [],
    };

    const newState = usersReducer(newInitialState, newAction);
    expect(newState).toEqual(expectedState);
  });
});
