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
          message: JSON.stringify(error.response.data),
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
  const refreshSession = async refreshToken => {
    const request = await axios.post(`${BACKEND_PERSONAL_TEACHING}oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token: `${refreshToken}`,
    })
      .then(onSuccessSession)
      .catch(onFail);

    return request;
  };
  const getSession = async () => {
    let sessionObject;
    const notSignedIn = {
      signedIn: false,
      accessToken: '',
      refreshToken: '',
      expiresAt: 0,
    };
    const sessionVar = (localStorage.getItem('sessionVar') || '');

    if (sessionVar.length > 0) {
      sessionObject = JSON.parse(sessionVar);
      if (sessionObject.refreshToken && sessionObject.expiresAt) {
        if (Math.abs(new Date()) > sessionObject.expiresAt - 300
          && sessionObject.expiresAt > 0
          && sessionObject.refreshToken.length > 0) {
          sessionObject = await refreshSession(sessionObject.refreshToken)
            .then(data => data);
        }
      }
    }

    if (sessionObject.error) {
      return notSignedIn;
    }

    return sessionObject;
  };
  const getConfig = async params => {
    const sessionObject = await getSession();
    if (sessionObject.accessToken.length > 0) {
      return {
        headers: {
          Authorization: `Bearer ${sessionObject.accessToken}`,
        },
        params,
      };
    }

    return {
      params,
    };
  };

  // Requests methods
  const makeGetRequest = async (path, params = {}) => {
    const jsonConfig = await getConfig(params);

    const request = axios.get(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };
  const makePostRequest = async (path, params = {}) => {
    const jsonConfig = await getConfig();
    const request = axios.post(`${BACKEND_PERSONAL_TEACHING}${path}`, params, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };

  // Cloudinary methods
  const getCloudinaryPreset = () => makeGetRequest('cloudinary');

  // Teacher methods
  const getTeachersList = () => makeGetRequest('teachers');
  const getTeacherInfo = id => makeGetRequest(`teachers/${id}`);
  const addTeacher = teacher => makePostRequest('teachers', teacher);

  // User methods
  const addUser = user => makePostRequest('users', user);

  return {
    getCloudinaryPreset,

    addUser,

    getTeachersList,
    getTeacherInfo,
    addTeacher,

    getSession,
    signInRequest,
    signOutRequest,
  };
};

export default PersonalTeaching;
