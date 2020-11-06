import { combineReducers } from 'redux';
import teachersReducer from './teachers.reducer';

export default combineReducers({
  teachers: teachersReducer,
});
