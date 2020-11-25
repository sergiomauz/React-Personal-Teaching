/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_TEACHERS_LIST } from '../../helpers/constants';
import { addTeacher } from '../../redux/actions/teachers.actions';

import aStyle from '../../styles/index.module.css';
import photoTeacher from '../../images/teacher.jpg';
import loadingGif from '../../images/loading.gif';

import Cloudinary from '../../apis/Cloudinary';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
});

const mapDispatchToProps = {
  addTeacher,
};

const EditTeacher = props => {
  const {
    requestapi,
    addTeacher,
  } = props;

  const txtFullname = useRef(null);
  const txtEmail = useRef(null);
  const inputPhoto = useRef(null);
  const txtCourse = useRef(null);
  const txtDescription = useRef(null);

  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handlerUploadFile = async e => {
    e.preventDefault();

    if (inputPhoto.current.files.length > 0) {
      setLoading(true);
      const request = await Cloudinary().unsignedUploadFile(inputPhoto.current.files);
      setUploadedImage(request.secure_url);
      setLoading(false);
    }
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
        uploadedImage,
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
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Teacher
      </h1>
      <form className={aStyle.formContainer} onSubmit={handlerSaveTeacher}>
        <h2 className={aStyle.titleOne}>
          New Teacher
        </h2>
        <fieldset
          disabled={requestapi.working || loading}
          aria-busy={requestapi.working || loading}
        >
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
              {
                (loading) && <img className={aStyle.height320px} src={loadingGif} alt="Preview" />
              }
              {
                (uploadedImage.length > 0 && !loading) && <img className={aStyle.height320px} src={uploadedImage} alt="Preview" />
              }
              {
                (uploadedImage.length === 0 && !loading) && <img className={aStyle.height320px} src={photoTeacher} alt="Preview" />
              }
              <input
                ref={inputPhoto}
                type="file"
                className={aStyle.invisible}
                onChange={handlerUploadFile}
                accept="image/x-png,image/gif,image/jpeg"
              />
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
  );
};

EditTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTeacher);
