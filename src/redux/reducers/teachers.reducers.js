import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from '../actions/types';

const initialState = {
  teachers: [],
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHERS_LIST:
      return {
        ...state,
        teachers: action.payload,
      };
    case GET_TEACHER_INFO:
      return {
        ...state,
        teacher: action.payload,
      };
    case ADD_TEACHER:
      return {
        ...state,
        teachers: [
          ...state.teachers, action.payload,
        ],
      };
    case UPDATE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map(
          teacher => (teacher.id === action.payload.id
            ? action.payload
            : teacher),
        ),
      };
    case REMOVE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(teacher => teacher.id !== action.payload),
      };
    default:
      return state;
  }
};

export default teachersReducer;
