import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';


const SessionForms = ({ sessionInfo }) => (
  <>

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
