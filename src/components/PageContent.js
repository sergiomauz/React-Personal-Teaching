import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserAppointments from '../containers/UserAppointments';
import TeacherDetails from '../containers/TeacherDetails';
import TeachersList from '../containers/TeachersList';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import NewTeacher from '../containers/NewTeacher';

import pcStyle from '../styles/pagecontent.module.css';
import aStyle from '../styles/index.module.css';

const PageContent = () => (
  <div className={pcStyle.pageContentWrapper}>
    <div className={`${aStyle.containerFluid} ${aStyle.my5rem}`}>
      <Switch>
        <Route exact path="/" component={TeachersList} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/teachers" component={TeachersList} />
        <Route exact path="/teacher/new" component={NewTeacher} />
        <Route exact path="/teacher/:id" component={TeacherDetails} />
        <Route exact path="/appointments" component={UserAppointments} />
      </Switch>
    </div>
  </div>

);

export default PageContent;
