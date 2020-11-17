import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSession } from '../redux/actions/sessions.actions';

import Sidebar from './Sidebar';
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
            <Route exact path={URL_INDEX} component={SignInForm} />
            <Route exact path={URL_SIGN_IN} component={SignInForm} />
            <Route exact path={URL_SIGN_UP} component={SignUpForm} />

            <Route exact path={URL_TEACHERS_LIST} component={TeachersList} />
            <Route exact path={URL_NEW_TEACHER} component={NewTeacher} />
            <Route exact path={URL_TEACHER_DETAILS} component={TeacherDetails} />
            <Route exact path={URL_USER_APPOINTMENTS} component={UserAppointments} />
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
