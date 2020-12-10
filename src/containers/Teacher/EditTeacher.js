/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_TEACHERS_LIST } from '../../helpers/constants';
import { getTeacherInfo, updateTeacher } from '../../redux/actions/teachers.actions';

import Cloudinary from '../../apis/Cloudinary';

import photoTeacher from '../../images/teacher.jpg';
import loadingGif from '../../images/loading.gif';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  teachers: state.teachers.list,
});

const mapDispatchToProps = {
  getTeacherInfo,
  updateTeacher,
};

const EditTeacher = props => {
  const {
    match,
    getTeacherInfo, updateTeacher,
    teachers,
  } = props;
  const { params } = match;
  const { id } = params;

  const txtFullname = useRef(null);
  const txtEmail = useRef(null);
  const inputPhoto = useRef(null);
  const txtCourse = useRef(null);
  const txtDescription = useRef(null);

  const history = useHistory();

  const [teacherInfo, setTeacherInfo] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');

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
    let newImage;
    e.preventDefault();

    setLoading(true);
    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
      setLoading(false);
    } else {
      if (uploadedImage.length === 0) {
        newImage = teacherInfo.photo;
      } else {
        newImage = uploadedImage;
      }
      const [fullname, email, photo, course, description] = [
        txtFullname.current.value,
        txtEmail.current.value,
        newImage,
        txtCourse.current.value,
        txtDescription.current.value,
      ];

      updateTeacher(id, {
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
    setLoading(true);
    const errorsList = [];
    getTeacherInfo(id).then(requestedData => {
      if (requestedData.error) {
        errorsList.push(requestedData.error.message);
        setErrors(errorsList);
      }
      setLoading(false);
    });
  }, [id, getTeacherInfo]);

  useEffect(() => {
    const filteredTeacher = teachers.filter(teacher => teacher.id === parseInt(id, 10));
    setTeacherInfo(filteredTeacher[0]);
  }, [teachers, id, setTeacherInfo]);

  return (
    <>
      <h1 className="title-one green-color">
        Teacher
      </h1>
      <form className="card form-container mb-3" onSubmit={handlerSaveTeacher}>
        <h2 className="title-one">
          Edit Teacher
        </h2>
        <fieldset className="card-body" disabled={loading}>
          <div className="row">
            {
              teacherInfo ? (
                <div className="col-12 offset-md-2 col-md-8 p-0">
                  <div className="form-group">
                    <label className="w-100">
                      <span className="control-label">fullname</span>
                      <input ref={txtFullname} type="text" className="form-control" defaultValue={teacherInfo.fullname} maxLength="50" />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="w-100">
                      <span className="control-label">email</span>
                      <input ref={txtEmail} type="email" className="form-control" defaultValue={teacherInfo.email} maxLength="50" />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="w-100 text-center">
                      <span className="control-label">Photo</span>
                      {
                        (loading) && <img className="teacher-photo" src={loadingGif} alt="Preview" />
                      }
                      {
                        (teacherInfo.photo.length > 0
                          && uploadedImage.length === 0
                          && !loading) && <img className="teacher-photo" src={teacherInfo.photo} alt="Preview" />
                      }
                      {
                        (teacherInfo.photo.length === 0
                          && uploadedImage.length === 0
                          && !loading) && <img className="teacher-photo" src={photoTeacher} alt="Preview" />
                      }
                      {
                        (uploadedImage.length > 0 && !loading) && <img className="teacher-photo" src={uploadedImage} alt="Preview" />
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
                      <input ref={txtCourse} type="text" className="form-control" defaultValue={teacherInfo.course} maxLength="50" />
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="w-100">
                      <span className="control-label">description</span>
                      <textarea ref={txtDescription} className="form-control" defaultValue={teacherInfo.description} maxLength="150" />
                    </label>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button type="submit" className="btn btn-outline-success">Save</button>
                  </div>
                  <div className="form-group">
                    <ul className="list-group border-0">
                      {
                        errors.length > 0 && (
                          errors
                            .map(item => (
                              <li key={item} className="list-group-item border-0">
                                <div className="alert alert-danger my-0">{item}</div>
                              </li>
                            ))
                        )
                      }
                    </ul>
                  </div>
                </div>
              )
                : (
                  <div className="col-12 text-center">
                    <img src={loadingGif} alt="Preview" />
                  </div>
                )
            }
          </div>
        </fieldset>
      </form>
    </>
  );
};

EditTeacher.propTypes = {
  getTeacherInfo: PropTypes.func.isRequired,
  updateTeacher: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTeacher);
