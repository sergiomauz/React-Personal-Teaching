import {
  GET_APPOINTMENTS_LIST, GET_APPOINTMENT_INFO, ADD_APPOINTMENT, UPDATE_APPOINTMENT,
  REMOVE_APPOINTMENT,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getAppointmentsList = () => ({
  type: GET_APPOINTMENTS_LIST,
});

const getAppointmentInfo = () => ({
  type: GET_APPOINTMENT_INFO,
});

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

const updateAppointment = appointment => ({
  type: UPDATE_APPOINTMENT,
  payload: appointment,
});

const removeAppointment = id => ({
  type: REMOVE_APPOINTMENT,
  payload: id,
});

export {
  getAppointmentsList, getAppointmentInfo, addAppointment, updateAppointment, removeAppointment,
};
