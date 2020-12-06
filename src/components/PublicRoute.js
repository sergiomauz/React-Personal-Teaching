/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { URL_INDEX } from '../helpers/constants';

const mapStateToProps = state => ({
  myprofile: state.users.myprofile,
});

const PublicRoute = props => {
  const { component, path, myprofile } = props;

  return (
    myprofile.signedIn
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
  myprofile: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(PublicRoute);
