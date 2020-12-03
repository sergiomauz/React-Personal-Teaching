import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const signInRequest = user => dispatch => {
  dispatch(startRequestApi(SIGN_IN_REQUEST));

  return PersonalTeaching().signInRequest(user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: SIGN_IN_REQUEST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess(SIGN_IN_REQUEST));
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: SIGN_IN_REQUEST,
          });
        }
        dispatch(requestApiError(SIGN_IN_REQUEST, requestedData));
      }

      return requestedData;
    });
};

const getSession = () => dispatch => {
  const requestedSession = PersonalTeaching().getSession();

  if (requestedSession) {
    if (requestedSession instanceof Promise) {
      dispatch(startRequestApi(GET_SESSION));
      requestedSession.then(requestedData => {
        if (!requestedData.error) {
          dispatch({
            type: GET_SESSION,
            payload: requestedData,
          });
          dispatch(requestApiSuccess(GET_SESSION));
        } else {
          if (requestedData.error.hasResponse) {
            dispatch({
              type: GET_SESSION,
            });
          }
          dispatch(requestApiError(GET_SESSION, requestedData));
        }
        return requestedData;
      });
    } else {
      dispatch({
        type: GET_SESSION,
        payload: requestedSession,
      });
    }
  } else {
    dispatch({
      type: GET_SESSION,
    });
  }
};

const signOutRequest = () => dispatch => {
  const requestedData = PersonalTeaching().signOutRequest();
  dispatch({
    type: SIGN_OUT,
    payload: requestedData,
  });
};

export {
  signInRequest, signOutRequest, getSession,
};
