// import PersonalTeaching from '../../apis/PersonalTeaching';
import {
  GET_USERS_LIST, GET_USER_INFO, ADD_USER, UPDATE_USER, REMOVE_USER,
} from './types';

const getUsersList = () => ({
  type: GET_USERS_LIST,
});

const getUserInfo = () => ({
  type: GET_USER_INFO,
});

const addUser = user => ({
  type: ADD_USER,
  payload: user,
});

const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
});

const removeUser = id => ({
  type: REMOVE_USER,
  payload: id,
});

export {
  getUsersList, getUserInfo, addUser, updateUser, removeUser,
};
