import {
  SIGN_IN_REQUEST, GET_SESSION, SIGN_OUT,
} from '../actions/types';

const initialState = {
  signedIn: false,
  accessToken: '',
  refreshToken: '',
  expiresAt: 0,
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case GET_SESSION:
    case SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default sessionsReducer;
