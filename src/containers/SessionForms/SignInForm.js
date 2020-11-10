/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import showErrors from '../../redux/actions/errors.actions';
import { signInRequest } from '../../redux/actions/sessions.actions';
import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  errors: state.errors.errors,
  sessions: state.sessions.sessions,
});

const mapDispatchToProps = {
  signInRequest,
  showErrors,
};

const SignInForm = props => {
  const {
    signInRequest, showErrors, sessions, errors,
  } = props;
  const [loading, setLoading] = useState(true);

  const txtUser = useRef(null);
  const txtPassword = useRef(null);

  useEffect(() => {
    showErrors({
      error: false,
      description: [],
    });
    setLoading(false);
  }, [showErrors]);

  const signIn = async e => {
    e.preventDefault();
    const [username, password] = [
      txtUser.current.value,
      txtPassword.current.value,
    ];
    signInRequest({ username, password });
  };

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
              <form className={aStyle.formContainer} onSubmit={signIn}>
                <h2 className={aStyle.titleOne}>
                  Please, Sign In
                </h2>
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
                  <button type="submit" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Sign In</button>
                </div>
              </form>
            </>
          )
      }
    </>
  );
};

SignInForm.propTypes = {
  showErrors: PropTypes.func.isRequired,
  signInRequest: PropTypes.func.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
  }),
};

SignInForm.defaultProps = {
  sessions: {
    signedIn: false,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
