import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
} from './types';
import { startRequestApi, requestApiSuccess, requestApiError } from './requestapi.actions';
import PersonalTeaching from '../../apis/PersonalTeaching';

const signInRequest = user => dispatch => {
  dispatch(startRequestApi());

  PersonalTeaching().signInRequest(user)
    .then(requestedData => {
      dispatch({
        type: SIGN_IN_REQUEST,
        payload: requestedData,
      });

      dispatch(requestApiSuccess());
    })
    .catch(() => {
      dispatch((requestApiError()));
    });
};

const getSession = () => async dispatch => {
  const requestedData = await PersonalTeaching().getSession();
  dispatch({
    type: GET_SESSION,
    payload: requestedData,
  });
};

const signOutRequest = () => async dispatch => {
  const requestedData = await PersonalTeaching().signOutRequest();
  dispatch({
    type: SIGN_OUT,
    payload: requestedData,
  });
};

export {
  signInRequest, getSession, signOutRequest,
};
