/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_TEACHERS_LIST } from '../../helpers/constants';
import { addUser } from '../../redux/actions/users.actions';

import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions,
  requestapi: state.requestapi,
});

const mapDispatchToProps = {
  addUser,
};

const SignUpForm = props => {
  const {
    sessions, requestapi,
    addUser,
  } = props;

  const txtFullname = useRef(null);
  const txtUser = useRef(null);
  const txtEmail = useRef(null);
  const txtPassword = useRef(null);

  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const lookForErrors = () => {
    const errorsList = [];

    if (txtFullname.current.value.trim().length === 0) {
      errorsList.push('Fullname field is mandatory');
    }
    if (txtEmail.current.value.trim().length === 0) {
      errorsList.push('Email field is mandatory');
    }

    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(txtEmail.current.value.trim())) {
      errorsList.push('Email field is not valid');
    }

    if (txtUser.current.value.trim().length === 0) {
      errorsList.push('User field is mandatory');
    }
    if (txtPassword.current.value.trim().length === 0) {
      errorsList.push('Password field is mandatory');
    }

    return errorsList;
  };

  const handlerSignUp = e => {
    e.preventDefault();

    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
    } else {
      const [fullname, email, username, password] = [
        txtFullname.current.value,
        txtEmail.current.value,
        txtUser.current.value,
        txtPassword.current.value,
      ];

      addUser({
        fullname, email, username, password,
      }).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        } else {
          history.push('/signin');
        }
      });
    }
  };

  return (
    <>
      {
        sessions.signedIn ? (
          <Redirect to={URL_TEACHERS_LIST} />
        )
          : (
            <>
              <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
                Personal Teachers
              </h1>
              <form className={aStyle.formContainer} onSubmit={handlerSignUp}>
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
                      <input ref={txtEmail} type="text" className={aStyle.formControl} />
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
          )
      }
    </>
  );
};

SignUpForm.propTypes = {
  addUser: PropTypes.func.isRequired,
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
