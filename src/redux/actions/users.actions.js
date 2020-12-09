import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER_N_REDIRECT, REMOVE_USER,
  CLEAN_STATE,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getUsersList = () => dispatch => PersonalTeaching().getUsersList()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_USERS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_USERS_LIST,
      });
    }

    return requestedData;
  });

const getUserInfo = id => dispatch => PersonalTeaching().getUserInfo(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_USER_INFO,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_USER_INFO,
      });
    }

    return requestedData;
  });

const getMyProfile = () => dispatch => PersonalTeaching().getMyProfile()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_MY_PROFILE,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_MY_PROFILE,
      });
    }

    return requestedData;
  });

const addUser = user => dispatch => PersonalTeaching().addUser(user)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: ADD_USER,
        payload: requestedData,
      });
    } if (requestedData.error.hasResponse) {
      dispatch({
        type: ADD_USER,
      });
    }

    return requestedData;
  });

const removeUser = id => dispatch => PersonalTeaching().removeUser(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: REMOVE_USER,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: REMOVE_USER,
      });
    }

    return requestedData;
  });

const updateUser = (id, user) => dispatch => PersonalTeaching().updateUser(id, user)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: UPDATE_USER_N_REDIRECT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: UPDATE_USER_N_REDIRECT,
      });
    }

    return requestedData;
  });

const signInRequest = user => dispatch => PersonalTeaching().signInRequest(user)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: SIGN_IN_REQUEST,
        payload: requestedData,
      });

      if (requestedData.signedIn) {
        dispatch(getMyProfile());
      }
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: SIGN_IN_REQUEST,
      });
    }

    return requestedData;
  });

const getSession = () => dispatch => {
  const requestedSession = PersonalTeaching().getSession();

  if (requestedSession) {
    if (requestedSession instanceof Promise) {
      requestedSession.then(requestedData => {
        if (!requestedData.error) {
          dispatch({
            type: GET_SESSION,
            payload: requestedData,
          });

          if (requestedData.signedIn) {
            dispatch(getMyProfile());
          }
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

      if (requestedSession.signedIn) {
        dispatch(getMyProfile());
      }
    }
  } else {
    dispatch({
      type: GET_SESSION,
    });
  }

  return requestedSession;
};

const signOutRequest = () => dispatch => {
  PersonalTeaching().signOutRequest();
  dispatch({
    type: SIGN_OUT,
  });
  dispatch({
    type: CLEAN_STATE,
  });
};

export {
  signInRequest, signOutRequest, getSession,
  getUsersList, getUserInfo, getMyProfile,
  addUser, updateUser, removeUser,
};
