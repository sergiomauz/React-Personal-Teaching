import {
  SIGN_IN_REQUEST, GET_SESSION, SIGN_OUT,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER, UPDATE_USER_N_REDIRECT, REMOVE_USER,
} from '../actions/types';

const initialState = {
  list: [],
  myProfile: {
    signedIn: false,
  },
};

const usersReducer = (state = initialState, action) => {
  if (action.payload) {
    switch (action.type) {
      case GET_SESSION:
      case SIGN_IN_REQUEST:
        return {
          ...state,
          myProfile: {
            signedIn: action.payload.signedIn,
          },
        };
      case GET_MY_PROFILE:
        return {
          ...state,
          myProfile: {
            ...action.payload.myprofile,
            signedIn: state.myProfile.signedIn,
          },
        };
      case GET_USERS_LIST:
        return {
          ...state,
          list: action.payload.users,
        };
      case GET_USER_INFO: {
        if (action.payload.user) {
          const newListState = state.list
            .filter(user => user.id !== action.payload.user.id);

          newListState.push(action.payload.user);
          return {
            ...state,
            list: newListState,
          };
        }
        return state;
      }
      case REMOVE_USER: {
        if (action.payload.user) {
          return {
            ...state,
            list: state.list.filter(user => user.id !== action.payload.user.id),
          };
        }
        return state;
      }
      case UPDATE_USER_N_REDIRECT:
      case UPDATE_USER: {
        if (action.payload.user) {
          return {
            ...state,
            list: state.list.map(
              user => (user.id === action.payload.user.id
                ? action.payload.user
                : user),
            ),
            myProfile: {
              ...(state.myProfile.id === action.payload.user.id
                ? action.payload.user
                : state.myProfile),
              signedIn: state.myProfile.signedIn,
            },
          };
        }
        return state;
      }
      case ADD_USER:
      default:
        return state;
    }
  } else if (SIGN_OUT === action.type) {
    return {
      ...initialState,
    };
  } else {
    return state;
  }
};

export default usersReducer;
