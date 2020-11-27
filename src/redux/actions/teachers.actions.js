import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, GET_TEACHER_AVAILABILITY,
  ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
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

const getTeacherInfo = id => dispatch => {
  dispatch(startRequestApi());
  return PersonalTeaching().getTeacherInfo(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHER_INFO,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHER_INFO,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const getTeacherAvailability = (id, date) => dispatch => {
  dispatch(startRequestApi());
  return PersonalTeaching().getTeacherAvailability(id, date)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHER_AVAILABILITY,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHER_AVAILABILITY,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

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

const removeTeacher = id => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().removeTeacher(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: REMOVE_TEACHER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: REMOVE_TEACHER,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const updateTeacher = (id, teacher) => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().updateTeacher(id, teacher)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: UPDATE_TEACHER,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: UPDATE_TEACHER,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

export {
  getTeachersList, getTeacherInfo,
  getTeacherAvailability,
  addTeacher, updateTeacher, removeTeacher,
};
