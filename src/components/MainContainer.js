import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSession, signOutRequest } from '../redux/actions/sessions.actions';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import aStyle from '../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions.sessions,
});

const mapDispatchToProps = {
  getSession,
  signOutRequest,
};

const MainContainer = props => {
  const { sessions, getSession, signOutRequest } = props;
  const [loading, setLoading] = useState(true);

  const handleSignOutRequest = () => {
    signOutRequest();
  };

  useEffect(() => {
    getSession();
    setLoading(false);
  }, [getSession]);

  return (
    <>
      {
        !loading
        && (
          <div className={aStyle.dFlexWrapper}>
            <Sidebar sessionInfo={sessions} signOutRequest={handleSignOutRequest} />
            <PageContent />
          </div>
        )
      }
    </>
  );
};

MainContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
  signOutRequest: PropTypes.func.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }),
};

MainContainer.defaultProps = {
  sessions: {
    signedIn: false,
    accessToken: '',
    refreshToken: '',
    expiresAt: 0,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
