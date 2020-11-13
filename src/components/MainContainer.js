import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';


const PageContent = ({ sessionInfo }) => (
  <>

  </>
);

PageContent.propTypes = {
  sessionInfo: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }).isRequired,
};

export default PageContent;
