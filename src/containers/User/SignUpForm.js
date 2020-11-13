/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions.sessions,
});

const SignUpForm = () => {
  const txtFullname = useRef(null);
  const txtUser = useRef(null);
  const txtEmail = useRef(null);
  const txtPassword = useRef(null);

  return (
    <>
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Personal Teachers
      </h1>
      <form className={aStyle.formContainer} action="">
        <h2 className={aStyle.titleOne}>
          New User
        </h2>
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
      </form>
    </>
  );
};

SignUpForm.propTypes = {
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(SignUpForm);
