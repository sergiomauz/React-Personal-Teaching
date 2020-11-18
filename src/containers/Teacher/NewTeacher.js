/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_TEACHERS_LIST, URL_SIGN_IN } from '../../helpers/constants';
import { addTeacher } from '../../redux/actions/teachers.actions';

import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions,
  requestapi: state.requestapi,
});

const mapDispatchToProps = {
  addTeacher,
};

const NewTeacher = props => {
  const {
    sessions, requestapi,
    addTeacher,
  } = props;

  const txtFullname = useRef(null);
  const txtEmail = useRef(null);
  const txtPhoto = useRef(null);
  const txtCourse = useRef(null);
  const txtDescription = useRef(null);

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

    if (txtCourse.current.value.trim().length === 0) {
      errorsList.push('Course field is mandatory');
    }
    if (txtDescription.current.value.trim().length === 0) {
      errorsList.push('Description field is mandatory');
    }

    return errorsList;
  };

  const handlerSaveTeacher = e => {
    e.preventDefault();

    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
    } else {
      const [fullname, email, photo, course, description] = [
        txtFullname.current.value,
        txtEmail.current.value,
        txtPhoto.current.value,
        txtCourse.current.value,
        txtDescription.current.value,
      ];

      addTeacher({
        fullname, email, photo, course, description,
      }).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        } else {
          history.push(URL_TEACHERS_LIST);
        }
      });
    }
  };

  return (
    <>
      {
        !sessions.signedIn ? (
          <Redirect to={URL_SIGN_IN} />
        )
          : (
            <>
              <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
                Teacher
              </h1>
              <form className={aStyle.formContainer} onSubmit={handlerSaveTeacher}>
                <h2 className={aStyle.titleOne}>
                  New Teacher
                </h2>
                <fieldset disabled={requestapi.working}>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>fullname</span>
                      <input ref={txtFullname} type="text" className={aStyle.formControl} maxLength="50" />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>email</span>
                      <input ref={txtEmail} type="email" className={aStyle.formControl} maxLength="50" />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>Photo</span>
                      <input ref={txtPhoto} type="file" className={aStyle.formControl} />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>course</span>
                      <input ref={txtCourse} type="text" className={aStyle.formControl} maxLength="50" />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>description</span>
                      <textarea ref={txtDescription} className={aStyle.formControl} maxLength="150" />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <button type="submit" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Save</button>
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

NewTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTeacher);
