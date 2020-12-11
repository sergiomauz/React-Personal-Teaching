/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorsList from '../../components/ErrorsList';
import { URL_USERS_LIST } from '../../helpers/constants';
import { getUserInfo, updateUser } from '../../redux/actions/users.actions';

import loadingGif from '../../images/loading.gif';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  users: state.users.list,
});

const mapDispatchToProps = {
  getUserInfo,
  updateUser,
};

const EditUser = props => {
  const {
    match,
    getUserInfo, updateUser,
    users,
  } = props;
  const { params } = match;
  const { id } = params;

  const txtFullname = useRef(null);
  const txtUser = useRef(null);
  const txtEmail = useRef(null);

  const history = useHistory();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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

    setLoading(true);
    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
      setLoading(false);
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
          setLoading(false);
        } else {
          history.push(URL_USERS_LIST);
        }
      });
    }
  };

  useEffect(() => {
    const errorsList = [];
    getUserInfo(id).then(requestedData => {
      if (requestedData.error) {
        errorsList.push(requestedData.error.message);
        setErrors(errorsList);
      }
      setLoading(false);
    });
  }, [id, getUserInfo]);

  useEffect(() => {
    const filteredUser = users.filter(user => user.id === parseInt(id, 10));
    setUserInfo(filteredUser[0]);
  }, [users, id, setUserInfo]);

  return (
    <>
      <h1 className="title-one green-color">
        Users
      </h1>
      <form className="card form-container mb-3" onSubmit={handlerSaveUser}>
        <h2 className="title-one">
          Edit User
        </h2>
        <fieldset className="card-body" disabled={loading}>
          <div className="row">
            {
              userInfo ? (
                <div className="col-12 offset-md-2 col-md-8 p-0">
                  <div className="form-group">
                    <label className="w-100">
                      <span className="control-label">fullname</span>
                      <input ref={txtFullname} type="text" className="form-control" defaultValue={userInfo.fullname} />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="w-100">
                      <span className="control-label">email</span>
                      <input ref={txtEmail} type="text" className="form-control" defaultValue={userInfo.email} />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="w-100">
                      <span className="control-label">username</span>
                      <input ref={txtUser} type="text" className="form-control" defaultValue={userInfo.username} />
                    </label>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button type="submit" className="btn btn-outline-success">Save</button>
                  </div>
                </div>
              )
                : (
                  <div className="col-12 text-center">
                    <img src={loadingGif} alt="Preview" />
                  </div>
                )
            }
            <div className="col-12 offset-md-2 col-md-8 p-0">
              <ErrorsList errorsInfo={errors} />
            </div>
          </div>
        </fieldset>
      </form>
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
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
