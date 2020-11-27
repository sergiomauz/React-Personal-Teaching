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
    let sessionObject;
    const sessionVar = (localStorage.getItem('sessionVar') || '');

    if (sessionVar.length > 0) {
      sessionObject = JSON.parse(sessionVar);
      if (sessionObject.refreshToken && sessionObject.expiresAt) {
        if (Math.abs(new Date()) > sessionObject.expiresAt - 300
          && sessionObject.expiresAt > 0
          && sessionObject.refreshToken.length > 0) {
          sessionObject = refreshSession(sessionObject.refreshToken)
            .then(data => data);
        }
      }
    }

    return sessionObject;
  };
  const getConfig = params => {
    const sessionObject = getSession();
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
  const makeGetRequest = (path, params = {}) => {
    const jsonConfig = getConfig(params);

    const request = axios.get(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };
  const makePostRequest = (path, params = {}) => {
    const jsonConfig = getConfig();
    const request = axios.post(`${BACKEND_PERSONAL_TEACHING}${path}`, params, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };
  const makePutRequest = (path, params = {}) => {
    const jsonConfig = getConfig();
    const request = axios.put(`${BACKEND_PERSONAL_TEACHING}${path}`, params, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };
  const makeDeleteRequest = (path, params = {}) => {
    const jsonConfig = getConfig(params);

    const request = axios.delete(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };

  // Cloudinary methods
  const getCloudinaryPreset = () => makeGetRequest('cloudinary');

  // Teacher methods
  const getTeachersList = () => makeGetRequest('teachers');
  const getTeacherInfo = id => makeGetRequest(`teachers/${id}`);
  const getTeacherAvailability = (id, date) => makeGetRequest(`teachers/${id}/availability/${date}`);
  const addTeacher = teacher => makePostRequest('teachers', teacher);
  const updateTeacher = (id, teacher) => makePutRequest(`teachers/${id}`, teacher);
  const removeTeacher = id => makeDeleteRequest(`teachers/${id}`);

  // User methods
  const getUsersList = () => makeGetRequest('users');
  const getUserInfo = id => makeGetRequest(`users/${id}`);
  const addUser = user => makePostRequest('users', user);
  const updateUser = (id, user) => makePutRequest(`users/${id}`, user);
  const removeUser = id => makeDeleteRequest(`users/${id}`);

  // Appointment methods
  const addAppointment = appointment => makePostRequest('appointments', appointment);
  const removeAppointment = id => makeDeleteRequest(`appointments/${id}`);

  return {
    getSession,
    signInRequest,
    signOutRequest,

    getCloudinaryPreset,

    getUsersList,
    getUserInfo,
    addUser,
    updateUser,
    removeUser,

    getTeachersList,
    getTeacherInfo,
    getTeacherAvailability,
    addTeacher,
    updateTeacher,
    removeTeacher,

    addAppointment,
    removeAppointment,
  };
};

export default PersonalTeaching;
