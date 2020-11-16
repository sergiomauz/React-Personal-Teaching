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

import pcStyle from '../styles/pagecontent.module.css';
import aStyle from '../styles/index.module.css';

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
            <Route exact path="/" component={SignInForm} />
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />

            <Route exact path="/teachers" component={TeachersList} />
            <Route exact path="/teacher/new" component={NewTeacher} />
            <Route exact path="/teacher/:id" component={TeacherDetails} />
            <Route exact path="/appointments" component={UserAppointments} />
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
