/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signUpRequest } from '../../redux/actions/sessions.actions';

import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions,
  requestapi: state.requestapi,
});

const mapDispatchToProps = {
  signInRequest,
};

const SignUpForm = props => {
  const { sessions, requestapi } = props;

  const txtFullname = useRef(null);
  const txtUser = useRef(null);
  const txtEmail = useRef(null);
  const txtPassword = useRef(null);

  return (
    <>
      {
        sessions.signedIn ? (
          <Redirect to="/teachers" />
        )
          : (
            <>
              <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
                Personal Teachers
              </h1>
              <form className={aStyle.formContainer} action="">
                <h2 className={aStyle.titleOne}>
                  New User
                </h2>
                <fieldset disabled={requestapi.working}>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>fullname</span>
                      <input ref={txtFullname} type="text" className={aStyle.formControl} />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>email</span>
                      <input ref={txtEmail} type="email" className={aStyle.formControl} />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>username</span>
                      <input ref={txtUser} type="text" className={aStyle.formControl} />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>password</span>
                      <input ref={txtPassword} type="password" className={aStyle.formControl} />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <button type="submit" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Sign Up</button>
                  </div>
                </fieldset>
              </form>
            </>
          )
      }
    </>
  );
};

SignUpForm.propTypes = {
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
    details: PropTypes.shape({
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
