import { SHOW_ERRORS } from '../actions/types';

const initialState = {
  errors: {
    error: false,
    description: [],
  },
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERRORS:
      return {
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default errorsReducer;
