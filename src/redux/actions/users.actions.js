import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER_N_REDIRECT, REMOVE_USER,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';

const signOutRequest = () => dispatch => {
  PersonalTeaching().signOutRequest();
  dispatch({
    type: SIGN_OUT,
  });
};

const signInRequest = user => dispatch => PersonalTeaching().signInRequest(user)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: SIGN_IN_REQUEST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: SIGN_IN_REQUEST,
      });
    }

    return requestedData;
  });

const getSession = session => dispatch => {
  const requestedSession = PersonalTeaching(session).getSession();

  if (requestedSession) {
    if (requestedSession instanceof Promise) {
      requestedSession.then(requestedData => {
        if (!requestedData.error) {
          dispatch({
            type: GET_SESSION,
            payload: requestedData,
          });
        } else if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_SESSION,
            payload: requestedData,
          });
        }
      });
    } else {
      dispatch({
        type: GET_SESSION,
        payload: requestedSession,
      });
    }
  } else {
    dispatch(signOutRequest());
  }

  return requestedSession;
};

const getUsersList = session => dispatch => PersonalTeaching(session).getUsersList()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_USERS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const getUserInfo = (id, session) => dispatch => PersonalTeaching(session).getUserInfo(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_USER_INFO,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const getMyProfile = session => dispatch => PersonalTeaching(session).getMyProfile()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_MY_PROFILE,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const addUser = (user, session) => dispatch => PersonalTeaching(session).addUser(user)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: ADD_USER,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const removeUser = (id, session) => dispatch => PersonalTeaching(session).removeUser(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: REMOVE_USER,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const updateUser = (id, user, session) => dispatch => PersonalTeaching(session).updateUser(id, user)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: UPDATE_USER_N_REDIRECT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

export {
  signInRequest, signOutRequest, getSession,
  getUsersList, getUserInfo, getMyProfile,
  addUser, updateUser, removeUser,
};
