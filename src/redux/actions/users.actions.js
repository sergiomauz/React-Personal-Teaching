import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER, REMOVE_USER,
  CLEAN_STATE,
} from './types';
import {
  execAction, startRequestApi, requestApiSuccess, requestApiError,
} from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getUsersList = () => dispatch => {
  dispatch(startRequestApi(GET_USERS_LIST));

  return PersonalTeaching().getUsersList()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_USERS_LIST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(GET_USERS_LIST));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_USERS_LIST,
          });
        }
        dispatch(requestApiError(GET_USERS_LIST, requestedData));
      }

      return requestedData;
    });
};

const getUserInfo = id => dispatch => {
  dispatch(startRequestApi(GET_USER_INFO));
  return PersonalTeaching().getUserInfo(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_USER_INFO,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(GET_USER_INFO));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_USER_INFO,
          });
        }
        dispatch(requestApiError(GET_USER_INFO, requestedData));
      }

      return requestedData;
    });
};

const getMyProfile = () => dispatch => {
  dispatch(startRequestApi(GET_MY_PROFILE));

  return PersonalTeaching().getMyProfile()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_MY_PROFILE,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(GET_MY_PROFILE));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_MY_PROFILE,
          });
        }
        dispatch(requestApiError(GET_MY_PROFILE, requestedData));
      }

      return requestedData;
    });
};

const addUser = user => dispatch => {
  dispatch(startRequestApi(ADD_USER));

  return PersonalTeaching().addUser(user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: ADD_USER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(ADD_USER));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: ADD_USER,
          });
        }
        dispatch(requestApiError(ADD_USER, requestedData));
      }

      return requestedData;
    });
};

const removeUser = id => dispatch => {
  dispatch(startRequestApi(REMOVE_USER));

  return PersonalTeaching().removeUser(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: REMOVE_USER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(REMOVE_USER));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: REMOVE_USER,
          });
        }
        dispatch(requestApiError(REMOVE_USER, requestedData));
      }

      return requestedData;
    });
};

const updateUser = (id, user) => dispatch => {
  dispatch(startRequestApi(UPDATE_USER));

  return PersonalTeaching().updateUser(id, user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: UPDATE_USER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(UPDATE_USER));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: UPDATE_USER,
          });
        }
        dispatch(requestApiError(UPDATE_USER, requestedData));
      }

      return requestedData;
    });
};

const signInRequest = user => dispatch => {
  dispatch(startRequestApi(SIGN_IN_REQUEST));

  return PersonalTeaching().signInRequest(user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: SIGN_IN_REQUEST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(SIGN_IN_REQUEST));

        if (requestedData.signedIn) {
          dispatch(getMyProfile());
        }
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: SIGN_IN_REQUEST,
          });
        }
        dispatch(requestApiError(SIGN_IN_REQUEST, requestedData));
      }

      return requestedData;
    });
};

const getSession = () => dispatch => {
  const requestedSession = PersonalTeaching().getSession();

  if (requestedSession) {
    if (requestedSession instanceof Promise) {
      dispatch(startRequestApi(GET_SESSION));
      requestedSession.then(requestedData => {
        if (!requestedData.error) {
          dispatch({
            type: GET_SESSION,
            payload: requestedData,
          });
          dispatch(requestApiSuccess(GET_SESSION));

          if (requestedData.signedIn) {
            dispatch(getMyProfile());
          }
        } else {
          if (requestedData.error.hasResponse) {
            dispatch({
              type: GET_SESSION,
            });
          }
          dispatch(requestApiError(GET_SESSION, requestedData));
        }
      });
    } else {
      dispatch(execAction(GET_SESSION));
      dispatch({
        type: GET_SESSION,
        payload: requestedSession,
      });

      if (requestedSession.signedIn) {
        dispatch(getMyProfile());
      }
    }
  } else {
    dispatch(execAction(GET_SESSION));
    dispatch({
      type: GET_SESSION,
    });
  }
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
  getUsersList, getUserInfo, getMyProfile, addUser, updateUser, removeUser,
};
