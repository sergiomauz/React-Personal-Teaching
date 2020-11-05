import {
  TEACHERS_LIST, SHOW_TEACHER, ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from '../actions/types';

const initialState = {
  teachers: [],
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHERS_LIST:
      return {
        ...state,
      };
    case SHOW_TEACHER:
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
