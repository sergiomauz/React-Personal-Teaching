import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getTeachersList = () => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().getTeachersList()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHERS_LIST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHERS_LIST,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const getTeacherInfo = () => ({
  type: GET_TEACHER_INFO,
});

const addTeacher = teacher => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().addTeacher(teacher)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: ADD_TEACHER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: ADD_TEACHER,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const updateTeacher = teacher => ({
  type: UPDATE_TEACHER,
  payload: teacher,
});

const removeTeacher = id => ({
  type: REMOVE_TEACHER,
  payload: id,
});

export {
  getTeachersList, getTeacherInfo, addTeacher, updateTeacher, removeTeacher,
};
