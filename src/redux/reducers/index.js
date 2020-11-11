import { combineReducers } from 'redux';
import teachersReducer from './teachers.reducer';
import usersReducer from './users.reducer';
import sessionsReducer from './sessions.reducer';
import appointmentsReducer from './appointments.reducer';

export default combineReducers({
  users: usersReducer,
  sessions: sessionsReducer,
  teachers: teachersReducer,
  appointments: appointmentsReducer,
});
