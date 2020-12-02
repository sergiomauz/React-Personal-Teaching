import {
  GET_USER_APPOINTMENTS_LIST, GET_TEACHER_APPOINTMENTS_LIST,
  ADD_APPOINTMENT, REMOVE_APPOINTMENT,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getUserAppointmentsList = () => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().getUserAppointmentsList()
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_USER_APPOINTMENTS_LIST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_USER_APPOINTMENTS_LIST,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const getTeacherAppointmentsList = teacherId => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().getTeacherAppointmentsList(teacherId)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: GET_TEACHER_APPOINTMENTS_LIST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: GET_TEACHER_APPOINTMENTS_LIST,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const addAppointment = appointment => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().addAppointment(appointment)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: ADD_APPOINTMENT,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: ADD_APPOINTMENT,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const removeAppointment = id => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().removeAppointment(id)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: REMOVE_APPOINTMENT,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: REMOVE_APPOINTMENT,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

export {
  getUserAppointmentsList, getTeacherAppointmentsList,
  addAppointment, removeAppointment,
};
