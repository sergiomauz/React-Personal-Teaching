import {
  GET_USERS_LIST, GET_USER_INFO, ADD_USER, UPDATE_USER, REMOVE_USER,
} from '../actions/types';

const initialState = {
  list: [],
  user: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload.user,
      };
    case ADD_USER:
      return {
        ...state,
        list: [
          ...state.list, action.payload,
        ],
      };
    case UPDATE_USER:
      return {
        ...state,
        list: state.list.map(
          user => (user.id === action.payload.id
            ? action.payload
            : user),
        ),
      };
    case REMOVE_USER:
      return {
        ...state,
        list: state.list.filter(user => user.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default usersReducer;
