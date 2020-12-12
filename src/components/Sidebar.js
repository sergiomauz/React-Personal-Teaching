/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signOutRequest } from '../redux/actions/users.actions';
import { URL_SIGN_IN } from '../helpers/constants';

import '../styles/formal.css';

const mapStateToProps = state => ({
  myProfile: state.users.myProfile,
});

const mapDispatchToProps = {
  signOutRequest,
};

const Sidebar = props => {
  const { myProfile, signOutRequest } = props;
  const divSidebar = useRef(null);
  const history = useHistory();

  const toggleSidebar = e => {
    e.preventDefault();
    divSidebar.current.classList.toggle('toggle-sidebar');
  };

  const handlerSignOutRequest = e => {
    e.preventDefault();
    signOutRequest();

    history.push(URL_SIGN_IN);
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
      <div className="d-flex flex-column justify-content-center">
        {
          myProfile.username && (
            <label className="w-100">
              <span className="control-label font-weight-bold">USER</span>
              <Link className="form-control border-right-0 border-left-0 font-weight-bold green-color text-center" to="/">
                {myProfile.username}
              </Link>
            </label>
          )
        }
      </div>
      <ul className="list-group">
        {
          myProfile.signedIn ? (
            <>
              <li className="list-group-item p-0">
                <Link className="list-group-item-action" to="/teachers">
                  Teachers
                </Link>
              </li>
              {
                myProfile && (
                  <>
                    {
                      myProfile.admin && (
                        <>
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
                        </>
                      )
                    }
                  </>
                )
              }
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
  myProfile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
    admin: PropTypes.bool,
    signedIn: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
