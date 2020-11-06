import {
  GET_USERS_LIST, GET_USER_INFO, ADD_USER, UPDATE_USER, REMOVE_USER,
} from '../actions/types';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [
          ...state.users, action.payload,
        ],
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(
          user => (user.id === action.payload.id
            ? action.payload
            : user),
        ),
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default usersReducer;
