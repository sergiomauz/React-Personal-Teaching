import { combineReducers } from 'redux';
import requestapiReducer from './requestapi.reducer';
import teachersReducer from './teachers.reducer';
import usersReducer from './users.reducer';
import sessionsReducer from './sessions.reducer';
import appointmentsReducer from './appointments.reducer';

export default combineReducers({
  requestapi: requestapiReducer,
  users: usersReducer,
  sessions: sessionsReducer,
  teachers: teachersReducer,
  appointments: appointmentsReducer,
});
