import React from 'react';
import { Route } from 'react-router-dom';
import SignInForm from '../containers/SessionForms/SignInForm';
import SignUp from '../containers/SessionForms/SignUp';

const SessionForms = () => (
  <>
    <Route exact path="/" component={SignInForm} />
    <Route exact path="/signin" component={SignInForm} />
    <Route exact path="/signup" component={SignUp} />
  </>
);

export default SessionForms;
