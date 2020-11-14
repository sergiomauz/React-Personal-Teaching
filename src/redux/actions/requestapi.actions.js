import {
  START_REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR,
} from './types';

const startRequestApi = () => ({
  type: START_REQUEST_API,
});

const requestApiSuccess = () => ({
  type: REQUEST_API_SUCCESS,
});

const requestApiError = () => ({
  type: REQUEST_API_ERROR,
});

export {
  startRequestApi, requestApiSuccess, requestApiError,
};
