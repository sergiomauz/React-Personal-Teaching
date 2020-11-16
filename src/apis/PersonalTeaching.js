import axios from 'axios';
import { BACKEND_PERSONAL_TEACHING } from '../helpers/constants';

const PersonalTeaching = () => {
  const onSuccessSession = ({ data }) => {
    const sessionObject = {
      signedIn: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Math.abs(new Date()) + 1000 * data.expires_in,
    };
    localStorage.setItem('sessionVar', JSON.stringify(sessionObject));

    return sessionObject;
  };
  const onSuccess = ({ data }) => data;
  const onFail = error => {
    if (error.response) {
      return ({
        error: {
          hasResponse: true,
          message: error.response.data.error_description,
        },
      });
    }

    return ({
      error: {
        hasResponse: false,
        message: error.message,
      },
    });
  };

  // Session methods
  const signInRequest = user => {
    const request = axios.post(`${BACKEND_PERSONAL_TEACHING}oauth/token`, {
      grant_type: 'password',
      username: `${user.username}`,
      password: `${user.password}`,
    })
      .then(onSuccessSession)
      .catch(onFail);

    return request;
  };
  const signOutRequest = () => {
    const sessionObject = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    localStorage.setItem('sessionVar', JSON.stringify(sessionObject));

    return sessionObject;
  };
  const refreshSession = refreshToken => {
    const request = axios.post(`${BACKEND_PERSONAL_TEACHING}oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token: `${refreshToken}`,
    })
      .then(onSuccessSession)
      .catch(onFail);

    return request;
  };
  const getSession = () => {
    let sessionObject = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    const sessionVar = (localStorage.getItem('sessionVar') || '');

    if (sessionVar.length > 0) {
      sessionObject = JSON.parse(sessionVar);
      if (sessionObject.refreshToken && sessionObject.expiresAt) {
        if (Math.abs(new Date()) > sessionObject.expiresAt
          && sessionObject.expiresAt > 0
          && sessionObject.refreshToken.length > 0) {
          sessionObject = refreshSession(sessionObject.refreshToken)
            .then(data => data);
        }
      }
    }

    return sessionObject;
  };
  const getConfig = async params => {
    const sessionObject = await getSession();
    const config = {
      headers: {
        Authorization: `Bearer ${sessionObject.accessToken}`,
      },
      params,
    };

    return config;
  };

  //
  const makeGetRequest = async (path, params = {}) => {
    let request;
    let jsonConfig = await getConfig(params);

    request = await axios.get(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig).then(onSuccess, onFail);
    let { isAxiosError } = { ...request };
    if (isAxiosError) {
      jsonConfig = await getConfig(params);
      request = await axios.get(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig).then(onSuccess, onFail);
      isAxiosError = { ...request }.isAxiosError;
      if (isAxiosError) {
        return {
          error: true,
        };
      }
    }

    return request;
  };
  const makePostRequest = async (path, params = {}) => {
    let request;
    let jsonConfig = await getConfig();

    request = await axios.post(`${BACKEND_PERSONAL_TEACHING}${path}`, params, jsonConfig).then(onSuccess, onFail);
    let { isAxiosError } = { ...request };
    if (isAxiosError) {
      jsonConfig = await getConfig();
      request = await axios.post(`${BACKEND_PERSONAL_TEACHING}${path}`, params, jsonConfig).then(onSuccess, onFail);
      isAxiosError = { ...request }.isAxiosError;
      if (isAxiosError) {
        return {
          error: true,
        };
      }
    }

    return request;
  };

  // Teacher methods
  const getTeachersList = () => makeGetRequest('teachers');
  const getTeacherInfo = id => makeGetRequest(`teachers/${id}`);
  const addTeacher = teacher => makePostRequest('teachers', teacher);

  return {
    getTeachersList,
    getTeacherInfo,
    addTeacher,

    getSession,
    signInRequest,
    signOutRequest,
  };
};

export default PersonalTeaching;
