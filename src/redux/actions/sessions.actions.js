import {
  SIGN_IN_REQUEST, SIGN_OUT, GET_SESSION,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';

const signInRequest = user => async dispatch => {
  const requestedData = await PersonalTeaching().signInRequest(user);
  dispatch({
    type: SIGN_IN_REQUEST,
    payload: requestedData,
  });
};

const getSession = () => async dispatch => {
  const requestedData = await PersonalTeaching().getSession();
  dispatch({
    type: GET_SESSION,
    payload: requestedData,
  });
};

const signOutRequest = () => {
  console.log('mauricio');
  const requestedData = PersonalTeaching().signOutRequest();
  return {
    type: SIGN_OUT,
    payload: requestedData,
  };
};

export {
  signInRequest, getSession, signOutRequest,
};
