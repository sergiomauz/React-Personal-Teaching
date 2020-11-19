/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Forbidden from './Forbidden';

const mapStateToProps = state => ({
  sessions: state.sessions,
});

const ProtectedRoute = props => {
  const { component, path, sessions } = props;

  return (
    <>
      {
        sessions.signedIn ? (
          <Route component={component} path={path} />
        )
          : (
            <Forbidden />
          )
      }
    </>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(ProtectedRoute);
