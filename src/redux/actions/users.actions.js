// import PersonalTeaching from '../../apis/PersonalTeaching';
import {
  GET_USERS_LIST, GET_USER_INFO, ADD_USER, UPDATE_USER, REMOVE_USER, GET_MY_PROFILE,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getUsersList = () => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().getUsersList()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_USERS_LIST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_USERS_LIST,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const getUserInfo = id => dispatch => {
  dispatch(startRequestApi());
  return PersonalTeaching().getUserInfo(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_USER_INFO,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_USER_INFO,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const getMyProfile = () => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().getMyProfile()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_MY_PROFILE,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_MY_PROFILE,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const addUser = user => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().addUser(user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: ADD_USER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: ADD_USER,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const removeUser = id => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().removeUser(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: REMOVE_USER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: REMOVE_USER,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const updateUser = (id, user) => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().updateUser(id, user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: UPDATE_USER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: UPDATE_USER,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

export {
  getUsersList, getUserInfo, getMyProfile, addUser, updateUser, removeUser,
};
