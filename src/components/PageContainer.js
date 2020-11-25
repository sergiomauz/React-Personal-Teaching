import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSession } from '../redux/actions/sessions.actions';

import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import NotFound from './NotFound';

import SignInForm from '../containers/User/SignInForm';
import SignUpForm from '../containers/User/SignUpForm';
import UserAppointments from '../containers/Appointment/UserAppointments';
import TeacherDetails from '../containers/Teacher/TeacherDetails';
import TeachersList from '../containers/Teacher/TeachersList';
import NewTeacher from '../containers/Teacher/NewTeacher';

import pcStyle from '../styles/pagecontainer.module.css';
import aStyle from '../styles/index.module.css';

import {
  URL_INDEX,
  URL_SIGN_IN,
  URL_SIGN_UP,
  URL_USERS_LIST,
  URL_NEW_USER,
  URL_USER_DETAILS,
  URL_NEW_TEACHER,
  URL_TEACHERS_LIST,
  URL_TEACHER_DETAILS,
  URL_USER_APPOINTMENTS,
} from '../helpers/constants';

const mapDispatchToProps = {
  getSession,
};

const PageContainer = props => {
  const { getSession } = props;

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <div className={aStyle.dFlexWrapper}>
      <Sidebar />
      <div className={pcStyle.pageContentWrapper}>
        <div className={`${aStyle.containerFluid} ${aStyle.pt5rem}`}>
          <Switch>
            <PublicRoute exact path={URL_INDEX} component={SignInForm} />
            <PublicRoute exact path={URL_SIGN_IN} component={SignInForm} />
            <PublicRoute exact path={URL_SIGN_UP} component={SignUpForm} />
            <ProtectedRoute exact path={URL_USERS_LIST} component={UserAppointments} />
            <ProtectedRoute exact path={URL_NEW_USER} component={UserAppointments} />
            <ProtectedRoute exact path={URL_USER_DETAILS} component={UserAppointments} />

            <ProtectedRoute exact path={URL_TEACHERS_LIST} component={TeachersList} />
            <ProtectedRoute exact path={URL_NEW_TEACHER} component={NewTeacher} />
            <ProtectedRoute exact path={URL_TEACHER_DETAILS} component={TeacherDetails} />
            <ProtectedRoute exact path={URL_USER_APPOINTMENTS} component={UserAppointments} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

PageContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PageContainer);
