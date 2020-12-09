/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Forbidden from './Forbidden';

import loadingGif from '../images/loading.gif';

const mapStateToProps = state => ({
  myprofile: state.users.myprofile,
});

const ProtectedRoute = props => {
  const { component, path, myprofile } = props;

  return (
    <>
      {
        myprofile.signedIn ? (
          <>
            {
              myprofile.id ? (
                <Route
                  exact
                  component={component}
                  path={path}
                />
              )
                : (
                  <div className="row">
                    <div className="col-12 text-center">
                      <img src={loadingGif} alt="Preview" />
                    </div>
                  </div>
                )

            }
          </>
        )
          : <Forbidden />
      }
    </>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  myprofile: PropTypes.shape({
    id: PropTypes.number,
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(ProtectedRoute);
