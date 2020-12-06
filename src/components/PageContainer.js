import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSession, signOutRequest } from '../redux/actions/sessions.actions';

import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';

import Welcome from '../containers/User/Welcome';
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
  myprofile: state.users.myprofile,
});

const mapDispatchToProps = {
  getSession, signOutRequest,
};

const PageContainer = props => {
  const {
    sessions, requestapi, myprofile,
    getSession, signOutRequest,
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
    signOutRequest]);

  return (
    <div className="d-flex flex-flex-wrap">
      <Sidebar />
      <div className="container">
        <div className="container-fluid pt-5">
          <Switch>
            <Route exact path={URL_INDEX} component={sessions.signedIn ? Welcome : SignInForm} />
            <PublicRoute exact path={URL_SIGN_IN} component={SignInForm} />
            <PublicRoute exact path={URL_SIGN_UP} component={SignUpForm} />
            <ProtectedRoute exact path={URL_USER_APPOINTMENTS} component={UserAppointments} />
            <ProtectedRoute
              exact
              path={URL_EDIT_USER}
              component={myprofile.admin ? EditUser : Forbidden}
            />
            <ProtectedRoute
              exact
              path={URL_USERS_LIST}
              component={myprofile.admin ? UsersList : Forbidden}
            />

            <ProtectedRoute
              exact
              path={URL_NEW_TEACHER}
              component={myprofile.admin ? NewTeacher : Forbidden}
            />
            <ProtectedRoute
              exact
              path={URL_EDIT_TEACHER}
              component={myprofile.admin ? EditTeacher : Forbidden}
            />
            <ProtectedRoute
              exact
              path={URL_TEACHER_APPOINTMENTS}
              component={myprofile.admin ? TeacherAppointments : Forbidden}
            />
            <ProtectedRoute exact path={URL_TEACHER_DETAILS} component={TeacherDetails} />
            <ProtectedRoute exact path={URL_TEACHERS_LIST} component={TeachersList} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

PageContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
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
  myprofile: PropTypes.shape({
    admin: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
