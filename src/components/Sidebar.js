import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signOutRequest } from '../redux/actions/sessions.actions';
import aStyle from '../styles/index.module.css';
import cStyle from '../styles/sidebar.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions,
});

const mapDispatchToProps = {
  signOutRequest,
};

const Sidebar = props => {
  const { sessions, signOutRequest } = props;
  const divSidebar = useRef(null);
  const history = useHistory();

  const toggleSidebar = e => {
    e.preventDefault();
    divSidebar.current.classList.toggle(cStyle.toggleSidebar);
  };

  const handlerSignOutRequest = e => {
    e.preventDefault();
    signOutRequest();

    history.push('/signin');
  };

  return (
    <div ref={divSidebar} className={cStyle.sidebarWrapper}>
      <div className={`${cStyle.topSidebar} ${cStyle.moveOutSideRight} ${aStyle.dFlex} ${aStyle.justifyContentRight}`}>
        <button className={aStyle.btn} type="button" onClick={toggleSidebar}>
          <i className="fa fa-bars" aria-hidden="true" />
        </button>
      </div>
      <div className={`${cStyle.sidebarHeading} ${aStyle.dFlex} ${aStyle.justifyContentCenter}`}>
        <div className={cStyle.sidebarLogo} />
      </div>
      <ul className={aStyle.listGroup}>
        {
          sessions.signedIn ? (
            <>
              <li className={`${aStyle.listGroupItem}`}>
                <Link className={`${aStyle.listGroupItemAction}`} to="/teachers">
                  Teachers
                </Link>
              </li>
              <li className={`${aStyle.listGroupItem}`}>
                <Link className={`${aStyle.listGroupItemAction}`} to="/teacher/new">
                  New Teacher
                </Link>
              </li>
              <li className={`${aStyle.listGroupItem}`}>
                <Link className={`${aStyle.listGroupItemAction}`} to="/appointments">
                  Appointments
                </Link>
              </li>
              <li className={`${aStyle.listGroupItem}`}>
                <button type="button" className={`${aStyle.listGroupItemButton}`} onClick={handlerSignOutRequest}>
                  Sign out
                </button>
              </li>
            </>
          )
            : (
              <>
                <li className={`${aStyle.listGroupItem}`}>
                  <Link className={`${aStyle.listGroupItemAction}`} to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className={`${aStyle.listGroupItem}`}>
                  <Link className={`${aStyle.listGroupItemAction}`} to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )
        }
      </ul>

      <div className={cStyle.sidebarBottom}>
        <div className={cStyle.sidebarSocialContainer}>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="https://vimeo.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-vimeo-v" />
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-pinterest-p" />
          </a>
        </div>
        <div className={cStyle.sidebarTrademark}>
          React Personal Teachers &trade; &reg;
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  signOutRequest: PropTypes.func.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
