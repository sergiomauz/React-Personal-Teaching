/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Forbidden from './Forbidden';

const mapStateToProps = state => ({
  myprofile: state.users.myprofile,
});

const ProtectedRoute = props => {
  const { component, path, myprofile } = props;

  return (
    myprofile.signedIn
      ? (
        <Route exact component={component} path={path} />
      ) : (
        <Forbidden />
      )
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  myprofile: PropTypes.shape({
    admin: PropTypes.bool,
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(ProtectedRoute);
