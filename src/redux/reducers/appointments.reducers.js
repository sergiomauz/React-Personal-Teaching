import {
  GET_APPOINTMENTS_LIST, GET_APPOINTMENT_INFO, ADD_APPOINTMENT, UPDATE_APPOINTMENT,
  REMOVE_APPOINTMENT,
} from '../actions/types';

const initialState = {
  appointments: [],
};

const appointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointments: action.payload,
      };
    case GET_APPOINTMENT_INFO:
      return {
        ...state,
        appointment: action.payload,
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [
          ...state.appointments, action.payload,
        ],
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(
          appointment => (appointment.id === action.payload.id
            ? action.payload
            : appointment),
        ),
      };
    case REMOVE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload),
      };
    default:
      return state;
  }
};

export default appointmentsReducer;
