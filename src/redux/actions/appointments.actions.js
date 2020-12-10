import {
  GET_USER_APPOINTMENTS_LIST, GET_TEACHER_APPOINTMENTS_LIST,
  ADD_APPOINTMENT, REMOVE_APPOINTMENT,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getUserAppointmentsList = () => dispatch => PersonalTeaching()
  .getUserAppointmentsList()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_USER_APPOINTMENTS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_USER_APPOINTMENTS_LIST,
      });
    }

    return requestedData;
  });

const getTeacherAppointmentsList = teacherId => dispatch => PersonalTeaching()
  .getTeacherAppointmentsList(teacherId)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_TEACHER_APPOINTMENTS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: GET_TEACHER_APPOINTMENTS_LIST,
      });
    }

    return requestedData;
  });

const addAppointment = appointment => dispatch => PersonalTeaching()
  .addAppointment(appointment)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: ADD_APPOINTMENT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: ADD_APPOINTMENT,
      });
    }

    return requestedData;
  });

const removeAppointment = id => dispatch => PersonalTeaching()
  .removeAppointment(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: REMOVE_APPOINTMENT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch({
        type: REMOVE_APPOINTMENT,
      });
    }

    return requestedData;
  });

export {
  getUserAppointmentsList, getTeacherAppointmentsList,
  addAppointment, removeAppointment,
};
