/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorsList from '../../components/ErrorsList';
import { signInRequest } from '../../redux/actions/users.actions';

import '../../styles/formal.css';

const mapDispatchToProps = {
  signInRequest,
};

const SignInForm = props => {
  const { signInRequest } = props;

  const txtUser = useRef(null);
  const txtPassword = useRef(null);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
      setLoading(false);
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
          setLoading(false);
        }
      });
    }
  };

  return (
    <>
      <h1 className="title-one green-color text-center" data-test="signInTitle">
        Personal Teachers
      </h1>
      <form className="card form-container mb-3" onSubmit={handlerSignIn}>
        <h2 className="title-one">
          Please, Sign In
        </h2>
        <fieldset className="card-body" disabled={loading}>
          <div className="row">
            <div className="col-12 offset-md-2 col-md-8 p-0">
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
                <button type="submit" className="btn btn-outline-success">Sign In</button>
              </div>
            </div>
            <div className="col-12 offset-md-2 col-md-8 p-0">
              <ErrorsList errorsInfo={errors} />
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignInForm);
