import axios from 'axios';
import { BACKEND_PERSONAL_TEACHING } from '../helpers/constants';

const PersonalTeaching = session => {
  const sessionDefaultObject = {
    signedIn: false,
    accessToken: '',
    refreshToken: '',
    expiresAt: 0,
  };

  // Session objects managers
  const setValidSessionObject = sessionData => {
    if (sessionData) {
      return {
        signedIn: true,
        accessToken: sessionData.access_token,
        refreshToken: sessionData.refresh_token,
        expiresAt: Math.abs(new Date()) + 1000 * sessionData.expires_in,
      };
    }

    return sessionData;
  };
  const sessionPersonalTeaching = () => session;

  // Methdos for processing promises
  const onSuccessSession = ({ data }) => {
    const sessionToStorage = setValidSessionObject(data);
    localStorage.setItem('sessionVar', JSON.stringify(sessionToStorage));

    return sessionToStorage;
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
    localStorage.setItem('sessionVar', JSON.stringify(sessionDefaultObject));

    return sessionDefaultObject;
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
    let sessionObject = sessionPersonalTeaching();
    // console.log(sessionObject);
    if (!sessionObject) {
      const sessionVar = (localStorage.getItem('sessionVar') || '');

      if (sessionVar.length > 0) {
        sessionObject = JSON.parse(sessionVar);

        if (sessionObject.refreshToken && sessionObject.expiresAt) {
          if (Math.abs(new Date()) > sessionObject.expiresAt - 300
            && sessionObject.expiresAt > 0
            && sessionObject.refreshToken.length > 0) {
            sessionObject = refreshSession(sessionObject.refreshToken);
          }
        }
      } else {
        sessionObject = sessionDefaultObject;
      }
    }

    return sessionObject;
  };
  const getConfig = async params => {
    const sessionObject = getSession();
    if (sessionObject) {
      if (sessionObject instanceof Promise) {
        const requestedData = await sessionObject;
        if (requestedData) {
          if (requestedData.accessToken) {
            return {
              headers: {
                Authorization: `Bearer ${requestedData.accessToken}`,
              },
              params,
            };
          }
        }
      }
      if (sessionObject.accessToken) {
        return {
          headers: {
            Authorization: `Bearer ${sessionObject.accessToken}`,
          },
          params,
        };
      }
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
  const makePutRequest = async (path, params = {}) => {
    const jsonConfig = await getConfig();
    const request = axios.put(`${BACKEND_PERSONAL_TEACHING}${path}`, params, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };
  const makeDeleteRequest = async (path, params = {}) => {
    const jsonConfig = await getConfig(params);

    const request = axios.delete(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig)
      .then(onSuccess)
      .catch(onFail);

    return request;
  };

  // Cloudinary methods
  const getCloudinaryPreset = () => makeGetRequest('cloudinary');

  // Teacher methods
  const getLastTeacher = () => makeGetRequest('teachers/last');
  const getTeachersList = () => makeGetRequest('teachers');
  const getTeacherInfo = id => makeGetRequest(`teachers/${id}`);
  const getTeacherAvailability = (id, date) => makeGetRequest(`teachers/${id}/availability/${date}`);
  const addTeacher = teacher => makePostRequest('teachers', teacher);
  const updateTeacher = (id, teacher) => makePutRequest(`teachers/${id}`, teacher);
  const removeTeacher = id => makeDeleteRequest(`teachers/${id}`);

  // User methods
  const getLastUser = () => makeGetRequest('users/last');
  const getUsersList = () => makeGetRequest('users');
  const getUserInfo = id => makeGetRequest(`users/${id}`);
  const getMyProfile = () => makeGetRequest('users/myprofile');
  const addUser = user => makePostRequest('users', user);
  const updateUser = (id, user) => makePutRequest(`users/${id}`, user);
  const removeUser = id => makeDeleteRequest(`users/${id}`);

  // Appointment methods
  const getUserAppointmentsList = () => makeGetRequest('users/myappointments');
  const getTeacherAppointmentsList = teacherId => makeGetRequest(`teachers/${teacherId}/appointments`);
  const getLastAppointment = () => makeGetRequest('appointments/last');
  const addAppointment = appointment => makePostRequest('appointments', appointment);
  const removeAppointment = id => makeDeleteRequest(`appointments/${id}`);

  return {
    getSession,
    signInRequest,
    signOutRequest,

    getCloudinaryPreset,

    getLastUser,
    getUsersList,
    getUserInfo,
    getMyProfile,
    addUser,
    updateUser,
    removeUser,

    getLastTeacher,
    getTeachersList,
    getTeacherInfo,
    getTeacherAvailability,
    addTeacher,
    updateTeacher,
    removeTeacher,

    getUserAppointmentsList,
    getTeacherAppointmentsList,
    getLastAppointment,
    addAppointment,
    removeAppointment,
  };
};

export default PersonalTeaching;
