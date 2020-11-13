import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSession } from '../redux/actions/sessions.actions';
import Sidebar from './Sidebar';

import SignInForm from '../containers/User/SignInForm';
import SignUp from '../containers/User/SignUp';
import UserAppointments from '../containers/Appointment/UserAppointments';
import TeacherDetails from '../containers/Teacher/TeacherDetails';
import TeachersList from '../containers/Teacher/TeachersList';
import NewTeacher from '../containers/Teacher/NewTeacher';

import pcStyle from '../styles/pagecontent.module.css';
import aStyle from '../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions.sessions,
});

const mapDispatchToProps = {
  getSession,
};

const PageContainer = props => {
  const { getSession, sessions } = props;

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
            <Route exact path="/signup" component={SignUp} />

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
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }),
};

PageContainer.defaultProps = {
  sessions: {
    signedIn: false,
    accessToken: '',
    refreshToken: '',
    expiresAt: 0,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
