/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
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
  const {
    requestapi,
    signInRequest,
  } = props;

  const txtUser = useRef(null);
  const txtPassword = useRef(null);

  const [errors, setErrors] = useState([]);

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
    if (errorsList.length > 0) {
      setErrors(errorsList);
    } else {
      const [username, password] = [
        txtUser.current.value,
        txtPassword.current.value,
      ];

      signInRequest({
        username, password,
      }).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        }
      });
    }
  };

  return (
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
            (!requestapi.working)
            && (
              (errors.length > 0)
              && (
                errors
                  .map(item => <li key={item} className={aStyle.alertDanger}>{item}</li>)
              )
            )
          }
        </ul>
      </form>
    </>
  );
};

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
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
