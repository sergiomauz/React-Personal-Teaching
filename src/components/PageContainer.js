import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSession } from '../redux/actions/sessions.actions';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';
import SessionForms from './SessionForms';

import pcStyle from '../styles/pagecontent.module.css';
import aStyle from '../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions.sessions,
});

const mapDispatchToProps = {
  getSession,
};

const PageContainer = props => {
  const { getSession, sessions } = props;
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
            <Sidebar />
            <div className={pcStyle.pageContentWrapper}>
              <div className={`${aStyle.containerFluid} ${aStyle.pt5rem}`}>
                <Switch>
                  {
                    sessions.signedIn ? <MainContainer /> : <SessionForms />
                  }
                </Switch>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

PageContainer.propTypes = {
  getSession: PropTypes.func.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }),
};

PageContainer.defaultProps = {
  sessions: {
    signedIn: false,
    accessToken: '',
    refreshToken: '',
    expiresAt: 0,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
