import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, GET_TEACHER_AVAILABILITY, CLEAR_TEACHER_AVAILABILITY,
  ADD_TEACHER, UPDATE_TEACHER_N_REDIRECT, REMOVE_TEACHER,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getTeachersList = () => dispatch => {
  dispatch(startRequestApi(GET_TEACHERS_LIST));

  return PersonalTeaching().getTeachersList()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHERS_LIST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(GET_TEACHERS_LIST));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHERS_LIST,
          });
        }
        dispatch(requestApiError(GET_TEACHERS_LIST, requestedData));
      }

      return requestedData;
    });
};

const getTeacherInfo = id => dispatch => {
  dispatch(startRequestApi(GET_TEACHER_INFO));

  return PersonalTeaching().getTeacherInfo(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHER_INFO,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(GET_TEACHER_INFO));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHER_INFO,
          });
        }
        dispatch(requestApiError(GET_TEACHER_INFO, requestedData));
      }

      return requestedData;
    });
};

const getTeacherAvailability = (id, date) => dispatch => {
  dispatch(startRequestApi(GET_TEACHER_AVAILABILITY));
  return PersonalTeaching().getTeacherAvailability(id, date)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHER_AVAILABILITY,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(GET_TEACHER_AVAILABILITY));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHER_AVAILABILITY,
          });
        }
        dispatch(requestApiError(GET_TEACHER_AVAILABILITY, requestedData));
      }

      return requestedData;
    });
};

const clearTeacherAvailability = () => dispatch => dispatch({
  type: CLEAR_TEACHER_AVAILABILITY,
});

const addTeacher = teacher => dispatch => {
  dispatch(startRequestApi(ADD_TEACHER));

  return PersonalTeaching().addTeacher(teacher)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: ADD_TEACHER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(ADD_TEACHER));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: ADD_TEACHER,
          });
        }
        dispatch(requestApiError(ADD_TEACHER, requestedData));
      }

      return requestedData;
    });
};

const removeTeacher = id => dispatch => {
  dispatch(startRequestApi(REMOVE_TEACHER));

  return PersonalTeaching().removeTeacher(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: REMOVE_TEACHER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(REMOVE_TEACHER));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: REMOVE_TEACHER,
          });
        }
        dispatch(requestApiError(REMOVE_TEACHER, requestedData));
      }

      return requestedData;
    });
};

const updateTeacher = (id, teacher) => dispatch => {
  dispatch(startRequestApi(UPDATE_TEACHER_N_REDIRECT));

  return PersonalTeaching().updateTeacher(id, teacher)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: UPDATE_TEACHER_N_REDIRECT,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(UPDATE_TEACHER_N_REDIRECT));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: UPDATE_TEACHER_N_REDIRECT,
          });
        }
        dispatch(requestApiError(UPDATE_TEACHER_N_REDIRECT, requestedData));
      }

      return requestedData;
    });
};

export {
  getTeachersList, getTeacherInfo,
  getTeacherAvailability, clearTeacherAvailability,
  addTeacher, updateTeacher, removeTeacher,
};
