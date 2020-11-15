import {
  START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
} from '../actions/types';

const initialState = {
  requestapi: {
    working: false,
    success: true,
    details: null,
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
          details: null,
        },
      };
    case REQUEST_API_SUCCESS:
      return {
        ...state,
        requestapi: {
          working: false,
          success: true,
          details: null,
        },
      };
    case REQUEST_API_ERROR:
      return {
        ...state,
        requestapi: {
          working: false,
          success: false,
          details: action.payload,
        },
      };
    default:
      return state;
  }
};

export default requestApiReducer;
