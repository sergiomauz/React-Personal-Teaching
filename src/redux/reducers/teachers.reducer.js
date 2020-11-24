import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from '../actions/types';

const initialState = {
  list: [],
  details: null,
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
        details: action.payload,
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
        list: state.teachers.filter(teacher => teacher.id !== action.payload),
      };
    default:
      return state;
  }
};

export default teachersReducer;
