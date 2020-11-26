const URL_INDEX = '/';
const URL_SIGN_IN = '/signin';
const URL_SIGN_UP = '/signup';
const URL_EDIT_USER = '/user/:id/edit';
const URL_USERS_LIST = '/users';

const URL_NEW_TEACHER = '/teacher/new';
const URL_TEACHERS_LIST = '/teachers';
const URL_TEACHER_DETAILS = '/teacher/:id';
const URL_EDIT_TEACHER = '/teacher/:id/edit';
const URL_USER_APPOINTMENTS = '/appointments';

const CLOUD_NAME = '{CLOUD_NAME}';
const BACKEND_PERSONAL_TEACHING = 'http://localhost:3000/api/v1/';
const ENDPOINT_FOR_UPLOAD_CLOUDINARY = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export {
  BACKEND_PERSONAL_TEACHING,
  ENDPOINT_FOR_UPLOAD_CLOUDINARY,
  CLOUD_NAME,

  URL_INDEX,
  URL_SIGN_IN,
  URL_SIGN_UP,
  URL_EDIT_USER,
  URL_USERS_LIST,
  URL_USER_APPOINTMENTS,

  URL_NEW_TEACHER,
  URL_EDIT_TEACHER,
  URL_TEACHERS_LIST,
  URL_TEACHER_DETAILS,
};
