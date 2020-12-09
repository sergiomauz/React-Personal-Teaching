import { combineReducers } from 'redux';
import teachersReducer from './teachers.reducer';
import usersReducer from './users.reducer';
import appointmentsReducer from './appointments.reducer';

export default combineReducers({
  users: usersReducer,
  teachers: teachersReducer,
  appointments: appointmentsReducer,
});
