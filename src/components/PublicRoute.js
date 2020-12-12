/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { URL_INDEX } from '../helpers/constants';

const mapStateToProps = state => ({
  myProfile: state.users.myProfile,
});

const PublicRoute = props => {
  const { component, path, myProfile } = props;

  return (
    myProfile.signedIn
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
  myProfile: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(PublicRoute);
