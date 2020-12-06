import { combineReducers } from 'redux';
import requestapiReducer from './requestapi.reducer';
import teachersReducer from './teachers.reducer';
import usersReducer from './users.reducer';
import appointmentsReducer from './appointments.reducer';

export default combineReducers({
  requestapi: requestapiReducer,
  users: usersReducer,
  teachers: teachersReducer,
  appointments: appointmentsReducer,
});
