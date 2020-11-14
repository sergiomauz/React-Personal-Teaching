import {
  START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
} from '../actions/types';

const initialState = {
  requestapi: {
    working: false,
    success: true,
  },
};

const requestApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REQUEST_API:
      return {
        ...state,
        requestapi: {
          working: true,
          success: false,
        },
      };
    case REQUEST_API_SUCCESS:
      return {
        requestapi: {
          ...state,
          working: false,
          success: true,
        },
      };
    case REQUEST_API_ERROR:
      return {
        requestapi: {
          ...state,
          working: false,
          success: false,
        },
      };
    default:
      return state;
  }
};

export default requestApiReducer;
