import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSession, signOutRequest } from '../redux/actions/sessions.actions';
import { getMyProfile } from '../redux/actions/users.actions';

import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import NotFound from './NotFound';

import SignInForm from '../containers/User/SignInForm';
import SignUpForm from '../containers/User/SignUpForm';
import EditUser from '../containers/User/EditUser';
import UsersList from '../containers/User/UsersList';
import UserAppointments from '../containers/Appointment/UserAppointments';
import TeacherAppointments from '../containers/Appointment/TeacherAppointments';
import TeacherDetails from '../containers/Teacher/TeacherDetails';
import TeachersList from '../containers/Teacher/TeachersList';
import NewTeacher from '../containers/Teacher/NewTeacher';
import EditTeacher from '../containers/Teacher/EditTeacher';

import {
  URL_INDEX,
  URL_SIGN_IN,
  URL_SIGN_UP,
  URL_EDIT_USER,
  URL_USERS_LIST,
  URL_NEW_TEACHER,
  URL_EDIT_TEACHER,
  URL_TEACHERS_LIST,
  URL_TEACHER_DETAILS,
  URL_USER_APPOINTMENTS,
  URL_TEACHER_APPOINTMENTS,
} from '../helpers/constants';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  sessions: state.sessions,
});

const mapDispatchToProps = {
  getSession, getMyProfile, signOutRequest,
};

const PageContainer = props => {
  const {
    sessions, requestapi,
    getSession, getMyProfile, signOutRequest,
  } = props;

  useEffect(() => {
    getSession();
  }, [getSession]);

  useEffect(() => {
    if (requestapi.details) {
      if (requestapi.details.error) {
        if (sessions.signedIn && !requestapi.working && !requestapi.success) {
          signOutRequest();
        }
      }
    }
  }, [
    sessions.signedIn,
    requestapi.details,
    requestapi.success,
    requestapi.working,
    signOutRequest,
    getMyProfile]);

  useEffect(() => {
    if (sessions.signedIn) {
      // getMyProfile();
    }
  }, [sessions.signedIn, getMyProfile]);

  return (
    <div className="d-flex flex-flex-wrap">
      <Sidebar />
      <div className="container">
        <div className="container-fluid pt-5">
          <Switch>
            <PublicRoute exact path={URL_INDEX} component={SignInForm} />
            <PublicRoute exact path={URL_SIGN_IN} component={SignInForm} />
            <PublicRoute exact path={URL_SIGN_UP} component={SignUpForm} />
            <ProtectedRoute exact path={URL_EDIT_USER} component={EditUser} />
            <ProtectedRoute exact path={URL_USER_APPOINTMENTS} component={UserAppointments} />
            <ProtectedRoute exact path={URL_USERS_LIST} component={UsersList} />

            <ProtectedRoute exact path={URL_TEACHERS_LIST} component={TeachersList} />
            <ProtectedRoute exact path={URL_NEW_TEACHER} component={NewTeacher} />
            <ProtectedRoute exact path={URL_EDIT_TEACHER} component={EditTeacher} />
            <ProtectedRoute exact path={URL_TEACHER_DETAILS} component={TeacherDetails} />
            <ProtectedRoute exact path={URL_TEACHER_APPOINTMENTS} component={TeacherAppointments} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

PageContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
  getMyProfile: PropTypes.func.isRequired,
  signOutRequest: PropTypes.func.isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
    details: PropTypes.shape({
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
  }).isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
