import {
  SIGN_IN_REQUEST, GET_SESSION, SIGN_OUT,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER, UPDATE_USER_N_REDIRECT, REMOVE_USER,
  CLEAN_STATE,
} from '../actions/types';

const initialState = {
  list: [],
  myprofile: {
    signedIn: false,
  },
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
        list: action.payload.users,
      };
    case GET_USER_INFO: {
      const newListState = state.list.filter(user => user.id !== action.payload.user.id);
      newListState.push(action.payload.user);
      return {
        ...state,
        list: newListState,
      };
    }
    case REMOVE_USER:
      return {
        ...state,
        list: state.list.filter(user => user.id !== action.payload.user.id),
      };
    case UPDATE_USER:
      return {
        ...state,
        list: state.list.map(
          user => (user.id === action.payload.user.id
            ? action.payload.user
            : user),
        ),
        myprofile: {
          ...action.payload.user,
          signedIn: state.myprofile.signedIn,
        },
      };
    case UPDATE_USER_N_REDIRECT:
      return {
        ...state,
        myprofile: {
          ...action.payload.user,
          signedIn: state.myprofile.signedIn,
        },
      };
    case ADD_USER:
    default:
      return state;
  }
};

export default usersReducer;
