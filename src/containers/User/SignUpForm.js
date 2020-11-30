/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_SIGN_IN } from '../../helpers/constants';
import { addUser } from '../../redux/actions/users.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
});

const mapDispatchToProps = {
  addUser,
};

const SignUpForm = props => {
  const {
    requestapi,
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
          history.push(URL_SIGN_IN);
        }
      });
    }
  };

  return (
    <>
      <h1 className="title-one green-color">
        Personal Teachers
      </h1>
      <form className="card form-container mb-3" onSubmit={handlerSignUp}>
        <h2 className="title-one">
          New User
        </h2>
        <fieldset
          className="card-body"
          disabled={requestapi.working}
          aria-busy={requestapi.working}
        >
          <div className="row">
            <div className="col-12 offset-md-2 col-md-8 p-0">
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">fullname</span>
                  <input ref={txtFullname} type="text" className="form-control" />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">email</span>
                  <input ref={txtEmail} type="text" className="form-control" />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">username</span>
                  <input ref={txtUser} type="text" className="form-control" />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">password</span>
                  <input ref={txtPassword} type="password" className="form-control" />
                </label>
              </div>
              <div className="form-group d-flex justify-content-center">
                <button type="submit" className="btn btn-success">Sign Up</button>
              </div>
              <div className="form-group">
                <ul className="list-group border-0">
                  {
                    (!requestapi.working)
                    && (
                      (errors.length > 0)
                      && (
                        errors
                          .map(item => (
                            <li key={item} className="list-group-item border-0">
                              <div className="alert alert-danger my-0">{item}</div>
                            </li>
                          ))
                      )
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </fieldset>

      </form>
    </>
  );
};

SignUpForm.propTypes = {
  addUser: PropTypes.func.isRequired,
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
