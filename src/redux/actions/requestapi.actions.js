import {
  START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
} from './types';

const startRequestApi = action => ({
  type: START_REQUEST_API,
  payload: { action },
});

const requestApiSuccess = action => ({
  type: REQUEST_API_SUCCESS,
  payload: { action },
});

const requestApiError = (action, error) => ({
  type: REQUEST_API_ERROR,
  payload: { action, error },
});

export {
  startRequestApi, requestApiSuccess, requestApiError,
};
