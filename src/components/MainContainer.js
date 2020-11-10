import React from 'react';
import { Route } from 'react-router-dom';
import UserAppointments from '../containers/UserAppointments';
import TeacherDetails from '../containers/Teacher/TeacherDetails';
import TeachersList from '../containers/Teacher/TeachersList';
import NewTeacher from '../containers/Teacher/NewTeacher';

const PageContent = () => (
  <>
    <Route exact path="/teachers" component={TeachersList} />
    <Route exact path="/teacher/new" component={NewTeacher} />
    <Route exact path="/teacher/:id" component={TeacherDetails} />
    <Route exact path="/appointments" component={UserAppointments} />
  </>
);

export default PageContent;
