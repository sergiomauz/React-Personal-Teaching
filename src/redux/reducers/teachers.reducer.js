import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO,
  GET_TEACHER_AVAILABILITY, CLEAR_TEACHER_AVAILABILITY,
  ADD_TEACHER, UPDATE_TEACHER, UPDATE_TEACHER_N_REDIRECT, REMOVE_TEACHER,
  CLEAN_STATE,
  // START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR, EXEC_ACTION,
} from '../actions/types';

const initialState = {
  list: [],
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return {
        ...initialState,
      };
    // case EXEC_ACTION:
    //   return {
    //     ...state,
    //     requestApi: {
    //       working: false,
    //       success: false,
    //       action: action.payload.action,
    //     },
    //   };
    // case START_REQUEST_API:
    //   return {
    //     ...state,
    //     requestApi: {
    //       working: true,
    //       success: false,
    //       action: action.payload.action,
    //     },
    //   };
    // case REQUEST_API_SUCCESS:
    //   return {
    //     ...state,
    //     requestApi: {
    //       working: false,
    //       success: true,
    //       action: action.payload.action,
    //     },
    //   };
    // case REQUEST_API_ERROR:
    //   return {
    //     ...state,
    //     requestApi: {
    //       working: false,
    //       success: false,
    //       action: action.payload.action,
    //       details: action.payload.error,
    //     },
    //   };
    case GET_TEACHER_AVAILABILITY:
      return {
        list: state.list.map(
          teacher => (teacher.id === action.payload.teacher.id
            ? {
              ...teacher,
              availability: action.payload.teacher.availability,
            } : teacher),
        ),
      };
    case CLEAR_TEACHER_AVAILABILITY:
      return {
        list: state.list.map(
          teacher => {
            const t = teacher;
            delete t.availability;
            return t;
          },
        ),
      };
    case GET_TEACHERS_LIST:
      return {
        ...state,
        list: action.payload.teachers,
      };
    case GET_TEACHER_INFO: {
      if (action.payload) {
        if (action.payload.teacher) {
          const newListState = state.list
            .filter(teacher => teacher.id !== action.payload.teacher.id);

          newListState.push(action.payload.teacher);
          return {
            ...state,
            list: newListState,
          };
        }
        return state;
      }
      return state;
    }
    case REMOVE_TEACHER: {
      if (action.payload) {
        if (action.payload.teacher) {
          return {
            ...state,
            list: state.list.filter(teacher => teacher.id !== action.payload.teacher.id),
          };
        }
        return state;
      }
      return state;
    }
    case UPDATE_TEACHER: {
      if (action.payload) {
        if (action.payload.teacher) {
          return {
            ...state,
            list: state.list.map(
              teacher => (teacher.id === action.payload.teacher.id
                ? action.payload.teacher
                : teacher),
            ),
          };
        }
        return state;
      }
      return state;
    }
    case ADD_TEACHER:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload.teacher,
        ],
      };
    case UPDATE_TEACHER_N_REDIRECT:
    default:
      return state;
  }
};

export default teachersReducer;
