/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signInRequest } from '../../redux/actions/sessions.actions';
import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions.sessions,
});

const mapDispatchToProps = {
  signInRequest,
};

const SignInForm = props => {
  const { signInRequest, sessions } = props;

  const [errors, setErrors] = useState([]);

  const txtUser = useRef(null);
  const txtPassword = useRef(null);
  const history = useHistory();

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

      signInRequest({ username, password })
        .then(() => {
          history.push('/teachers');
          setErrors([]);
        })
        .catch(err => {
          console.log(err);
        });
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
                <fieldset>
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
    accessToken: PropTypes.string,
    refreshToken: PropTypes.string,
    expiresAt: PropTypes.number,
  }),
};

SignInForm.defaultProps = {
  sessions: {
    signedIn: false,
    accessToken: '',
    refreshToken: '',
    expiresAt: 0,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
