/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { URL_INDEX } from '../helpers/constants';

const mapStateToProps = state => ({
  sessions: state.sessions,
});

const PublicRoute = props => {
  const { component, path, sessions } = props;

  return (
    sessions.signedIn
      ? (
        <Redirect to={URL_INDEX} />
      ) : (
        <Route exact path={path} component={component} />
      )
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(PublicRoute);
