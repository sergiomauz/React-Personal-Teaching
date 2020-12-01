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

const getTeacherAppointmentsList = () => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().getTeacherAppointmentsList()
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

const removeAppointment = id => ({
  type: REMOVE_APPOINTMENT,
  payload: id,
});

export {
  getUserAppointmentsList, getTeacherAppointmentsList,
  addAppointment, removeAppointment,
};
