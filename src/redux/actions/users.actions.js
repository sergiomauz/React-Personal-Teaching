// import PersonalTeaching from '../../apis/PersonalTeaching';
import {
  GET_USERS_LIST, GET_USER_INFO, ADD_USER, UPDATE_USER, REMOVE_USER,
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

const getUserInfo = () => ({
  type: GET_USER_INFO,
});

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

const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
});

export {
  getUsersList, getUserInfo, addUser, updateUser, removeUser,
};
