import {
  GET_USER_APPOINTMENTS_LIST, GET_TEACHER_APPOINTMENTS_LIST,
  ADD_APPOINTMENT, REMOVE_APPOINTMENT,
  SIGN_OUT,
} from '../actions/types';

const initialState = {
  list: [],
};

const appointmentsReducer = (state = initialState, action) => {
  if (action.payload) {
    switch (action.type) {
      case GET_USER_APPOINTMENTS_LIST:
      case GET_TEACHER_APPOINTMENTS_LIST:
        return {
          ...state,
          list: action.payload.appointments,
        };
      case ADD_APPOINTMENT:
        return {
          ...state,
          list: [
            ...state.list,
            action.payload.appointment,
          ],
        };
      case REMOVE_APPOINTMENT:
        return {
          ...state,
          list: state.list.filter(appointment => appointment.id !== action.payload.appointment.id),
        };
      default:
        return state;
    }
  } else if (action.type === SIGN_OUT) {
    return {
      ...initialState,
    };
  } else {
    return state;
  }
};

export default appointmentsReducer;
