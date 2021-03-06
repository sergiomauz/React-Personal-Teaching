/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorsList from '../../components/ErrorsList';
import { URL_TEACHERS_LIST } from '../../helpers/constants';
import { addTeacher } from '../../redux/actions/teachers.actions';

import Cloudinary from '../../apis/Cloudinary';

import photoTeacher from '../../images/teacher.jpg';
import loadingGif from '../../images/loading.svg';
import '../../styles/formal.css';

const mapDispatchToProps = {
  addTeacher,
};

const NewTeacher = props => {
  const {
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
  const [loading, setLoading] = useState(true);

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

    setLoading(true);
    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
      setLoading(false);
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
          setLoading(false);
        } else {
          history.push(URL_TEACHERS_LIST);
        }
      });
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <>
      <h1 className="title-one green-color text-center">
        Teacher
      </h1>
      <form className="card form-container mb-3" onSubmit={handlerSaveTeacher}>
        <h2 className="title-one">
          New Teacher
        </h2>
        <fieldset className="card-body" disabled={loading}>
          <div className="row">
            <div className="col-12 offset-md-2 col-md-8 p-0">
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">fullname</span>
                  <input ref={txtFullname} type="text" className="form-control" maxLength="50" />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">email</span>
                  <input ref={txtEmail} type="email" className="form-control" maxLength="50" />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100 text-center">
                  <span className="control-label">Photo</span>
                  {
                    (loading) && <img className="teacher-photo" src={loadingGif} alt="Preview" />
                  }
                  {
                    (uploadedImage.length > 0 && !loading) && <img className="teacher-photo" src={uploadedImage} alt="Preview" />
                  }
                  {
                    (uploadedImage.length === 0 && !loading) && <img className="teacher-photo" src={photoTeacher} alt="Preview" />
                  }
                  <input
                    ref={inputPhoto}
                    type="file"
                    className="invisible"
                    onChange={handlerUploadFile}
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">course</span>
                  <input ref={txtCourse} type="text" className="form-control" maxLength="50" />
                </label>
              </div>
              <div className="form-group">
                <label className="w-100">
                  <span className="control-label">description</span>
                  <textarea ref={txtDescription} className="form-control" maxLength="150" />
                </label>
              </div>
              <div className="form-group d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-success">Save</button>
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

NewTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NewTeacher);
