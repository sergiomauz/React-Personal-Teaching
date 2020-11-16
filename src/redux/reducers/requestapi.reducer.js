import {
  START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
} from '../actions/types';

const initialState = {
  working: false,
  success: true,
  details: null,
};

const requestApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REQUEST_API:
      return {
        ...state,
        ...{
          working: true,
          success: false,
          details: null,
        },
      };
    case REQUEST_API_SUCCESS:
      return {
        ...state,
        ...{
          working: false,
          success: true,
          details: null,
        },
      };
    case REQUEST_API_ERROR:
      return {
        ...state,
        ...{
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
