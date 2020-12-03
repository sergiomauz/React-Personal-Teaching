import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const signInRequest = user => dispatch => {
  dispatch(startRequestApi());

  return PersonalTeaching().signInRequest(user)
    .then(requestedData => {
      if (!requestedData.error) {
        dispatch({
          type: SIGN_IN_REQUEST,
          payload: requestedData,
        });
        dispatch(requestApiSuccess());
      } else {
        if (requestedData.error.hasResponse) {
          dispatch({
            type: SIGN_IN_REQUEST,
          });
        }
        dispatch(requestApiError(requestedData));
      }

      return requestedData;
    });
};

const getSession = () => dispatch => {
  const requestedSession = PersonalTeaching().getSession();

  if (requestedSession) {
    if (requestedSession instanceof Promise) {
      requestedSession.then(requestedData => {
        dispatch({
          type: GET_SESSION,
          payload: requestedData,
        });
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
