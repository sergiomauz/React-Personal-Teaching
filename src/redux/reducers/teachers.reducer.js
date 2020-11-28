import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO,
  GET_TEACHER_AVAILABILITY, CLEAR_TEACHER_AVAILABILITY,
  ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from '../actions/types';

const initialState = {
  list: [],
  teacher: null,
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHERS_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case GET_TEACHER_INFO:
      return {
        ...state,
        teacher: action.payload.teacher,
      };
    case GET_TEACHER_AVAILABILITY:
      return {
        list: [
          ...state.list,
        ],
        teacher: {
          ...state.teacher,
          ...action.payload,
        },
      };
    case CLEAR_TEACHER_AVAILABILITY:
      return {
        list: [
          ...state.list,
        ],
        teacher: {
          ...state.teacher,
          availability: [],
        },
      };
    case ADD_TEACHER:
      return {
        ...state,
        list: [
          ...state.list, action.payload,
        ],
      };
    case UPDATE_TEACHER:
      return {
        ...state,
        list: state.list.map(
          teacher => (teacher.id === action.payload.id
            ? action.payload
            : teacher),
        ),
      };
    case REMOVE_TEACHER:
      return {
        ...state,
        list: state.list.filter(teacher => teacher.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default teachersReducer;
