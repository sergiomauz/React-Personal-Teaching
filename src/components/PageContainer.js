import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSession, signOutRequest } from '../redux/actions/users.actions';

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

import loadingGif from '../images/loading.gif';

const mapStateToProps = state => ({
  myprofile: state.users.myprofile,
});

const mapDispatchToProps = {
  getSession, signOutRequest,
};

const PageContainer = props => {
  const {
    myprofile,
    getSession, signOutRequest,
  } = props;
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const sessionObject = getSession();
    if (sessionObject instanceof Promise) {
      sessionObject.then(requestedData => {
        if (requestedData.error) {
          setSessionError(true);
        } else {
          setSignedIn(requestedData.signedIn);
        }
        setLoading(false);
      });
    } else {
      setSignedIn(sessionObject.signedIn);
      setLoading(false);
    }
  }, [getSession]);

  useEffect(() => {
    if (signedIn && !loading && sessionError) {
      signOutRequest();
    }
  }, [signOutRequest, signedIn, loading, sessionError]);

  return (
    <>
      {
        !loading ? (
          <div className="d-flex">
            <Sidebar />
            <div className="container">
              <div className="container-fluid pt-5">
                <Switch>
                  {
                    myprofile.signedIn ? (
                      <>
                        {
                          myprofile.id ? (
                            <Route
                              exact
                              path={URL_INDEX}
                              component={Welcome}
                            />
                          )
                            : (
                              <div className="row">
                                <div className="col-12 text-center">
                                  <img src={loadingGif} alt="Preview" />
                                </div>
                              </div>
                            )

                        }
                      </>
                    )
                      : (
                        <Route
                          exact
                          path={URL_INDEX}
                          component={SignInForm}
                        />
                      )
                  }
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
        )
          : (
            <img src={loadingGif} alt="Preview" />
          )
      }
    </>
  );
};

PageContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
  signOutRequest: PropTypes.func.isRequired,
  myprofile: PropTypes.shape({
    admin: PropTypes.bool,
    signedIn: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
