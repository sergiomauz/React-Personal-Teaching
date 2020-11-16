/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signInRequest } from '../../redux/actions/sessions.actions';

import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions,
  requestapi: state.requestapi,
});

const mapDispatchToProps = {
  signInRequest,
};

const SignInForm = props => {
  const { signInRequest, sessions, requestapi } = props;

  const [errors, setErrors] = useState([]);

  const txtUser = useRef(null);
  const txtPassword = useRef(null);

  const lookForErrors = () => {
    const errorsList = [];

    if (txtUser.current.value.trim().length === 0) {
      errorsList.push('User field is mandatory');
    }

    if (txtPassword.current.value.trim().length === 0) {
      errorsList.push('Password field is mandatory');
    }

    return errorsList;
  };

  const handlerSignIn = e => {
    e.preventDefault();

    const errorsList = lookForErrors();
    setErrors(errorsList);
    if (errorsList.length === 0) {
      const [username, password] = [
        txtUser.current.value,
        txtPassword.current.value,
      ];

      signInRequest({ username, password });
    }
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
              <form className={aStyle.formContainer} onSubmit={handlerSignIn}>
                <h2 className={aStyle.titleOne}>
                  Please, Sign In
                </h2>
                <fieldset disabled={requestapi.working}>
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
                </fieldset>
                <ul className={aStyle.listGroupWithoutIcon}>
                  {
                    (errors.length > 0)
                      ? (
                        errors.map(item => <li key={item} className={aStyle.alertDanger}>{item}</li>)
                      )
                      : (
                        !(requestapi.working || requestapi.success)
                        && <li className={aStyle.alertDanger}>{requestapi.details.error.message}</li>
                      )
                  }
                </ul>
              </form>
            </>
          )
      }
    </>
  );
};

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
