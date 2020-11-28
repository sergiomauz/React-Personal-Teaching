/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_USERS_LIST } from '../../helpers/constants';
import { getUserInfo, updateUser } from '../../redux/actions/users.actions';

import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  user: state.users.user,
});

const mapDispatchToProps = {
  getUserInfo,
  updateUser,
};

const EditUser = props => {
  const {
    match,
    getUserInfo, updateUser,
    requestapi, user,
  } = props;
  const { params } = match;
  const { id } = params;

  const txtFullname = useRef(null);
  const txtUser = useRef(null);
  const txtEmail = useRef(null);

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

    return errorsList;
  };

  const handlerSaveUser = e => {
    e.preventDefault();

    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
    } else {
      const [fullname, email, username] = [
        txtFullname.current.value,
        txtEmail.current.value,
        txtUser.current.value,
      ];

      updateUser(id, {
        fullname, email, username,
      }).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        } else {
          history.push(URL_USERS_LIST);
        }
      });
    }
  };

  useEffect(() => {
    getUserInfo(id);
  }, [id, getUserInfo]);

  return (
    <>
      {
        user && (
          <>
            <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
              Personal Teachers
            </h1>
            <form className={aStyle.formContainer} onSubmit={handlerSaveUser}>
              <h2 className={aStyle.titleOne}>
                Edit User
              </h2>
              <fieldset disabled={requestapi.working}>
                <div className={aStyle.formGroup}>
                  <label>
                    <span className={aStyle.controlLabel}>fullname</span>
                    <input ref={txtFullname} type="text" className={aStyle.formControl} defaultValue={user.fullname} />
                  </label>
                </div>
                <div className={aStyle.formGroup}>
                  <label>
                    <span className={aStyle.controlLabel}>email</span>
                    <input ref={txtEmail} type="text" className={aStyle.formControl} defaultValue={user.email} />
                  </label>
                </div>
                <div className={aStyle.formGroup}>
                  <label>
                    <span className={aStyle.controlLabel}>username</span>
                    <input ref={txtUser} type="text" className={aStyle.formControl} defaultValue={user.username} />
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

EditUser.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
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
  user: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
  }),
};

EditUser.defaultProps = {
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);