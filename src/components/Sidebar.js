import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signOutRequest } from '../redux/actions/sessions.actions';

import '../styles/formal.css';

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
    divSidebar.current.classList.toggle('toggle-sidebar');
  };

  const handlerSignOutRequest = e => {
    e.preventDefault();
    signOutRequest();

    history.push('/signin');
  };

  return (
    <div ref={divSidebar} className="sidebar-wrapper">
      <div className="top-sidebar move-out-side-right d-flex justify-content-right">
        <button className="btn btn-outline-success" type="button" onClick={toggleSidebar}>
          <i className="fa fa-bars" aria-hidden="true" />
        </button>
      </div>
      <div className="sidebar-heading d-flex justify-content-center">
        <div className="sidebar-logo" />
      </div>
      <ul className="list-group">
        {
          sessions.signedIn ? (
            <>
              <li className="list-group-item p-0">
                <Link className="list-group-item-action" to="/teachers">
                  Teachers
                </Link>
              </li>
              <li className="list-group-item p-0">
                <Link className="list-group-item-action" to="/users">
                  Users
                </Link>
              </li>
              <li className="list-group-item p-0">
                <Link className="list-group-item-action" to="/teacher/new">
                  New Teacher
                </Link>
              </li>
              <li className="list-group-item p-0">
                <Link className="list-group-item-action" to="/appointments">
                  My appointments
                </Link>
              </li>
              <li className="list-group-item p-0">
                <button type="button" className="list-group-item-button" onClick={handlerSignOutRequest}>
                  Sign out
                </button>
              </li>
            </>
          )
            : (
              <>
                <li className="list-group-item p-0">
                  <Link className="list-group-item-action" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="list-group-item p-0">
                  <Link className="list-group-item-action" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )
        }
      </ul>

      <div className="sidebar-bottom">
        <div className="sidebar-social-container">
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
        <div className="sidebar-trademark">
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
