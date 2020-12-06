import {
  SIGN_IN_REQUEST, GET_SESSION, SIGN_OUT,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER, REMOVE_USER,
  CLEAN_STATE,
} from '../actions/types';

const initialState = {
  list: [],
  myprofile: {
    signedIn: false,
  },
  user: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
    case SIGN_OUT:
      return {
        ...initialState,
      };
    case GET_SESSION:
      return {
        ...state,
        myprofile: {
          signedIn: action.payload.signedIn,
        },
      };
    case GET_MY_PROFILE:
      return {
        ...state,
        myprofile: {
          ...action.payload.myprofile,
          signedIn: state.myprofile.signedIn,
        },
      };
    case SIGN_IN_REQUEST:
      return {
        ...state,
        myprofile: {
          signedIn: action.payload.signedIn,
        },
      };
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
