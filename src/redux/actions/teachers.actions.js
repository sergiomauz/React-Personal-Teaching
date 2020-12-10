import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, GET_TEACHER_AVAILABILITY, CLEAR_TEACHER_AVAILABILITY,
  ADD_TEACHER, UPDATE_TEACHER_N_REDIRECT, REMOVE_TEACHER,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getTeachersList = () => dispatch => PersonalTeaching()
  .getTeachersList()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_TEACHERS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_TEACHERS_LIST,
      });
    }

    return requestedData;
  });

const getTeacherInfo = id => dispatch => PersonalTeaching()
  .getTeacherInfo(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_TEACHER_INFO,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_TEACHER_INFO,
      });
    }

    return requestedData;
  });

const getTeacherAvailability = (id, date) => dispatch => PersonalTeaching()
  .getTeacherAvailability(id, date)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_TEACHER_AVAILABILITY,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_TEACHER_AVAILABILITY,
      });
    }

    return requestedData;
  });

const clearTeacherAvailability = () => dispatch => dispatch({
  type: CLEAR_TEACHER_AVAILABILITY,
});

const addTeacher = teacher => dispatch => PersonalTeaching()
  .addTeacher(teacher)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: ADD_TEACHER,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: ADD_TEACHER,
      });
    }

    return requestedData;
  });

const removeTeacher = id => dispatch => PersonalTeaching()
  .removeTeacher(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: REMOVE_TEACHER,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: REMOVE_TEACHER,
      });
    }

    return requestedData;
  });

const updateTeacher = (id, teacher) => dispatch => PersonalTeaching()
  .updateTeacher(id, teacher)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: UPDATE_TEACHER_N_REDIRECT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: UPDATE_TEACHER_N_REDIRECT,
      });
    }

    return requestedData;
  });

export {
  getTeachersList, getTeacherInfo,
  getTeacherAvailability, clearTeacherAvailability,
  addTeacher, updateTeacher, removeTeacher,
};
