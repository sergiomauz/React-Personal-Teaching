import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInForm from '../containers/User/SignInForm';
import SignUp from '../containers/User/SignUp';

const SessionForms = ({ sessionInfo }) => (
  <>
    <Route exact path="/" component={SignInForm} />
    <Route exact path="/signin" component={SignInForm} />
    <Route exact path="/signup" component={SignUp} />
  </>
);

SessionForms.propTypes = {
  sessionInfo: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }).isRequired,
};

export default SessionForms;
