import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserAppointments from '../containers/Appointment/UserAppointments';
import TeacherDetails from '../containers/Teacher/TeacherDetails';
import TeachersList from '../containers/Teacher/TeachersList';
import NewTeacher from '../containers/Teacher/NewTeacher';

const PageContent = ({ sessionInfo }) => (
  <>
    <Route exact path="/teachers" component={TeachersList} />
    <Route exact path="/teacher/new" component={NewTeacher} />
    <Route exact path="/teacher/:id" component={TeacherDetails} />
    <Route exact path="/appointments" component={UserAppointments} />
  </>
);

PageContent.propTypes = {
  sessionInfo: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }).isRequired,
};

export default PageContent;
