import {
  GET_USER_APPOINTMENTS_LIST, GET_TEACHER_APPOINTMENTS_LIST,
  ADD_APPOINTMENT, REMOVE_APPOINTMENT,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';
import { signOutRequest } from './users.actions';

const getUserAppointmentsList = session => dispatch => PersonalTeaching(session)
  .getUserAppointmentsList()
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_USER_APPOINTMENTS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const getTeacherAppointmentsList = (teacherId, session) => dispatch => PersonalTeaching(session)
  .getTeacherAppointmentsList(teacherId)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: GET_TEACHER_APPOINTMENTS_LIST,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const addAppointment = (appointment, session) => dispatch => PersonalTeaching(session)
  .addAppointment(appointment)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: ADD_APPOINTMENT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

const removeAppointment = (id, session) => dispatch => PersonalTeaching(session)
  .removeAppointment(id)
  .then(requestedData => {
    if (!requestedData.error) {
      dispatch({
        type: REMOVE_APPOINTMENT,
        payload: requestedData,
      });
    } else if (requestedData.error.hasResponse) {
      dispatch(signOutRequest());
    }

    return requestedData;
  });

export {
  getUserAppointmentsList, getTeacherAppointmentsList,
  addAppointment, removeAppointment,
};
