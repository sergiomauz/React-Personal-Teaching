import {
  GET_USER_APPOINTMENTS_LIST, GET_TEACHER_APPOINTMENTS_LIST,
  ADD_APPOINTMENT, REMOVE_APPOINTMENT,
} from '../actions/types';

const initialState = {
  list: [],
};

const appointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_APPOINTMENTS_LIST:
    case GET_TEACHER_APPOINTMENTS_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [
          ...state.appointments, action.payload,
        ],
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
