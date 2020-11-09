import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSession } from '../redux/actions/sessions.actions';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import aStyle from '../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions.sessions,
});

const mapDispatchToProps = {
  getSession,
};

const MainContainer = props => {
  const { sessions, getSession } = props;
  const [loading, setLoading] = useState(true);

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
            <Sidebar sessionInfo={sessions} />
            <PageContent />
          </div>
        )
      }
    </>
  );
};

MainContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
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
