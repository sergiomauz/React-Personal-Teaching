import {
  GET_USERS_LIST, GET_USER_INFO, ADD_USER, UPDATE_USER, REMOVE_USER, GET_MY_PROFILE,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
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

export {
  getUsersList, getUserInfo, getMyProfile, addUser, updateUser, removeUser,
};
