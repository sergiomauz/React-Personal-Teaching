import {
  START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
} from '../actions/types';

const initialState = {
  working: false,
  success: true,
  action: '',
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
          action: action.payload.action,
          details: null,
        },
      };
    case REQUEST_API_SUCCESS:
      return {
        ...state,
        ...{
          working: false,
          success: true,
          action: action.payload.action,
          details: null,
        },
      };
    case REQUEST_API_ERROR:
      console.log(action);
      console.log(action.payload);
      return {
        ...state,
        ...{
          working: false,
          success: false,
          action: action.payload.action,
          details: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export default requestApiReducer;
