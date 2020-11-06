// import PersonalTeaching from '../../apis/PersonalTeaching';
import {
  GET_APPOINTMENTS_LIST, GET_APPOINTMENT_INFO, ADD_APPOINTMENT, UPDATE_APPOINTMENT,
  REMOVE_APPOINTMENT,
} from './types';

const getAppointmentsList = () => ({
  type: GET_APPOINTMENTS_LIST,
});

const getAppointmentInfo = () => ({
  type: GET_APPOINTMENT_INFO,
});

const addAppointment = appointment => ({
  type: ADD_APPOINTMENT,
  payload: appointment,
});

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
