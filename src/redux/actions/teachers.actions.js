import {
  TEACHERS_LIST, SHOW_TEACHER, ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from './types';

const getTeachers = () => ({
  type: TEACHERS_LIST,
});

const getTeacherInfo = () => ({
  type: SHOW_TEACHER,
});

const addTeacher = teacher => ({
  type: ADD_TEACHER,
  payload: teacher,
});

const updateTeacher = teacher => ({
  type: UPDATE_TEACHER,
  payload: teacher,
});

const removeTeacher = id => ({
  type: REMOVE_TEACHER,
  payload: id,
});

export {
  getTeachers, getTeacherInfo, addTeacher, removeTeacher, updateTeacher,
};
