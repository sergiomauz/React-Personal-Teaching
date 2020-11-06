// import PersonalTeaching from '../../apis/PersonalTeaching';
import {
  GET_TEACHERS_LIST, GET_TEACHER_INFO, ADD_TEACHER, UPDATE_TEACHER, REMOVE_TEACHER,
} from './types';
import PersonalTeaching from '../../apis/PersonalTeaching';

const getTeachersList = () => async dispatch => {
  const requestedData = await PersonalTeaching().getTeachersList();
  dispatch({
    type: GET_TEACHERS_LIST,
    payload: requestedData,
  });
};

const getTeacherInfo = () => ({
  type: GET_TEACHER_INFO,
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
  getTeachersList, getTeacherInfo, addTeacher, updateTeacher, removeTeacher,
};
