import { SHOW_ERRORS } from './types';

const showErrors = caughtErrors => ({
  type: SHOW_ERRORS,
  payload: caughtErrors,
});

export default showErrors;
