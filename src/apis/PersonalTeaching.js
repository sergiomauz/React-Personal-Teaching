import axios from 'axios';
import { BACKEND_PERSONAL_TEACHING } from '../helpers/constants';

const PersonalTeaching = () => {
  const onSuccess = ({ data }) => data;
  const onFail = error => error;

  // Session methods
  const signInRequest = async user => {
    const request = await axios.post(`${BACKEND_PERSONAL_TEACHING}oauth/token`, {
      grant_type: 'password',
      username: `${user.username}`,
      password: `${user.password}`,
    }).then(onSuccess, onFail);

    let sessionObject = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    if (request.access_token) {
      sessionObject = {
        signedIn: true,
        accessToken: request.access_token,
        refreshToken: request.refresh_token,
        expiresAt: Math.abs(new Date()) + 1000 * request.expires_in,
      };
    }
    localStorage.setItem('sessionVar', JSON.stringify(sessionObject));

    return sessionObject;
  };
  const signOutRequest = () => {
    const sessionObject = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    localStorage.setItem('sessionVar', JSON.stringify(sessionObject));

    return signOutRequest;
  };
  const refreshSession = async refreshToken => {
    const request = await axios.post(`${BACKEND_PERSONAL_TEACHING}oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token: `${refreshToken}`,
    }).then(onSuccess, onFail);

    let sessionObject = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    if (request.access_token) {
      sessionObject = {
        signedIn: true,
        accessToken: request.access_token,
        refreshToken: request.refresh_token,
        expiresAt: Math.abs(new Date()) + 1000 * request.expires_in,
      };
    }
    localStorage.setItem('sessionVar', JSON.stringify(sessionObject));

    return sessionObject;
  };
  const getSession = async () => {
    let sessionObject = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    const sessionVar = (localStorage.getItem('sessionVar') || '');

    if (sessionVar.length > 0) {
      sessionObject = JSON.parse(sessionVar);
      if ((Math.abs(new Date()) > sessionObject.expiresAt && sessionObject.expiresAt > 0)
        || sessionObject.expiresAt === 0) {
        sessionObject = await refreshSession(sessionObject.refreshToken);
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
