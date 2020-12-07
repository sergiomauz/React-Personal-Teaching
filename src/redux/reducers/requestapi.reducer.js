import {
  EXEC_ACTION, START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
  CLEAN_STATE,
} from '../actions/types';

const initialState = {
  working: false,
  success: true,
  action: CLEAN_STATE,
};

const requestApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return {
        ...initialState,
      };
    case START_REQUEST_API:
      return {
        ...state,
        ...{
          working: true,
          success: false,
          action: action.payload.action,
        },
      };
    case EXEC_ACTION:
      return {
        ...state,
        ...{
          working: false,
          success: false,
          action: action.payload.action,
        },
      };
    case REQUEST_API_SUCCESS:
      return {
        ...state,
        ...{
          working: false,
          success: true,
          action: action.payload.action,
        },
      };
    case REQUEST_API_ERROR:
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
