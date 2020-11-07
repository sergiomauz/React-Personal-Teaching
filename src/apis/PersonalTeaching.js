import axios from 'axios';
import { BACKEND_PERSONAL_TEACHING } from '../helpers/constants';

const PersonalTeaching = () => {
  const onSuccess = ({ data }) => data;
  const onFail = error => error;
  const requestToken = async (username, password) => {
    let request = await axios.post(`${BACKEND_PERSONAL_TEACHING}oauth2/token`, {
      grant_type: 'client_credentials',
      username: `${username}`,
      password: `${password}`,
    }).then(onSuccess, onFail);

    const { isAxiosError } = { ...request };
    if (isAxiosError) {
      request = await axios.post(`${BACKEND_PERSONAL_TEACHING}oauth2/token`, {
        grant_type: 'client_credentials',
        username: `${username}`,
        password: `${password}`,
      }).then(onSuccess, onFail);
    }

    let sessionVar = {
      access_token: '',
      expires_at: 0,
    };
    if (request.access_token) {
      sessionVar = {
        access_token: request.access_token,
        expires_at: Math.abs(new Date()) + 1000 * request.expires_in,
      };
    }
    localStorage.setItem('sessionVar', JSON.stringify(sessionVar));
  };
  const getToken = async () => {
    let sessionObject;
    let sessionVar = (localStorage.getItem('sessionVar') || '');

    if (sessionVar.length > 0) {
      sessionObject = JSON.parse(sessionVar);
      if ((Math.abs(new Date()) > sessionObject.expires_at && sessionObject.expires_at > 0)
        || sessionObject.expires_at === 0) {
        await requestToken();
        sessionVar = (localStorage.getItem('sessionVar') || '');
        sessionObject = JSON.parse(sessionVar);
      }
    } else {
      await requestToken();
      sessionVar = (localStorage.getItem('sessionVar') || '');
      sessionObject = JSON.parse(sessionVar);
    }

    // return sessionObject.access_token;
    return 'abcdefghijkmnlopqrstuvwxyz';
  };
  const getConfig = async params => {
    const accessToken = await getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
  const makePutRequest = async (path, params = {}) => {
    let request;
    let jsonConfig = await getConfig(params);

    request = await axios.put(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig).then(onSuccess, onFail);
    let { isAxiosError } = { ...request };
    if (isAxiosError) {
      jsonConfig = await getConfig(params);
      request = await axios.put(`${BACKEND_PERSONAL_TEACHING}${path}`, jsonConfig).then(onSuccess, onFail);
      isAxiosError = { ...request }.isAxiosError;
      if (isAxiosError) {
        return {
          error: true,
        };
      }
    }

    return request;
  };

  const getTeachersList = () => makeGetRequest('teachers');
  const getTeacherInfo = id => makeGetRequest(`teachers/${id}`);

  const addTeacher = teacher => makePostRequest('teachers', teacher);

  return {
    getTeachersList,
    getTeacherInfo,
    addTeacher,
  };
};

export default PersonalTeaching;
