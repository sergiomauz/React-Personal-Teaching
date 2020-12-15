import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSession, getMyProfile, signOutRequest } from '../redux/actions/users.actions';

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

import loadingGif from '../images/loading.svg';
import '../styles/formal.css';

const mapStateToProps = state => ({
  myProfile: state.users.myProfile,
});

const mapDispatchToProps = {
  getSession, getMyProfile, signOutRequest,
};

const PageContainer = props => {
  const {
    myProfile,
    getSession, getMyProfile, signOutRequest,
  } = props;

  const [loading, setLoading] = useState(true);
  const [sessionCatched, setSessionCatched] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  // Load session when refresh page
  useEffect(() => {
    if (!sessionCatched) {
      const sessionObject = getSession();
      if (sessionObject instanceof Promise) {
        sessionObject.then(requestedData => {
          setSessionCatched(true);
          if (requestedData.error) {
            setSessionError(true);
          }
        });
      } else {
        setSessionCatched(true);
      }
    }
  }, [myProfile.signedIn, sessionCatched, getSession]);

  // Load profile if have a valid session
  useEffect(() => {
    if (sessionCatched) {
      if (myProfile.signedIn) {
        getMyProfile().then(requestedData => {
          if (requestedData.error) {
            setSessionError(true);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [myProfile.signedIn, sessionCatched, getMyProfile, signOutRequest]);

  // Valid current session
  useEffect(() => {
    if (myProfile.signedIn && !loading && sessionError) {
      setSessionError(false);
      signOutRequest();
    }
  }, [myProfile.signedIn, loading, sessionError, signOutRequest]);

  return (
    <>
      {
        !loading ? (
          <div className="d-flex">
            <Sidebar />
            <div className="container">
              <div className="container-fluid pt-5">
                <Switch>
                  <Route
                    exact
                    path={URL_INDEX}
                    component={myProfile.id ? Welcome : SignInForm}
                  />
                  <PublicRoute exact path={URL_SIGN_IN} component={SignInForm} />
                  <PublicRoute exact path={URL_SIGN_UP} component={SignUpForm} />
                  <ProtectedRoute
                    exact
                    path={URL_USER_APPOINTMENTS}
                    component={UserAppointments}
                  />
                  <ProtectedRoute
                    exact
                    path={URL_EDIT_USER}
                    component={myProfile.admin ? EditUser : Forbidden}
                  />
                  <ProtectedRoute
                    exact
                    path={URL_USERS_LIST}
                    component={myProfile.admin ? UsersList : Forbidden}
                  />

                  <ProtectedRoute
                    exact
                    path={URL_NEW_TEACHER}
                    component={myProfile.admin ? NewTeacher : Forbidden}
                  />
                  <ProtectedRoute
                    exact
                    path={URL_EDIT_TEACHER}
                    component={myProfile.admin ? EditTeacher : Forbidden}
                  />
                  <ProtectedRoute
                    exact
                    path={URL_TEACHER_APPOINTMENTS}
                    component={myProfile.admin ? TeacherAppointments : Forbidden}
                  />
                  <ProtectedRoute exact path={URL_TEACHER_DETAILS} component={TeacherDetails} />
                  <ProtectedRoute exact path={URL_TEACHERS_LIST} component={TeachersList} />

                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </div>
        )
          : (
            <img src={loadingGif} alt="Preview" className="center-screen" />
          )
      }
    </>
  );
};

PageContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
  getMyProfile: PropTypes.func.isRequired,
  signOutRequest: PropTypes.func.isRequired,
  myProfile: PropTypes.shape({
    admin: PropTypes.bool,
    signedIn: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
