/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_TEACHERS_LIST } from '../../helpers/constants';
import { getTeacherInfo, removeTeacher } from '../../redux/actions/teachers.actions';

import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teachercard.module.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  teacher: state.teachers.teacher,
});

const mapDispatchToProps = {
  getTeacherInfo,
  removeTeacher,
};

const TeacherDetails = props => {
  const {
    match,
    getTeacherInfo, removeTeacher,
    requestapi, teacher,
  } = props;
  const { params } = match;
  const { id } = params;

  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const handlerRemoveTeacher = e => {
    e.preventDefault();
    const errorsList = [];
    if (window.confirm('Are you sure?')) {
      removeTeacher(id).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        } else {
          history.push(URL_TEACHERS_LIST);
        }
      });
    }
  };

  useEffect(() => {
    getTeacherInfo(id);
  }, [id, getTeacherInfo]);

  return (
    <>
      {
        teacher && (
          <>
            <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
              Teacher Details
            </h1>
            <div
              className={aStyle.formContainer}
              disabled={requestapi.working}
              aria-busy={requestapi.working}
            >
              <h2 className={aStyle.titleOne}>
                {teacher.fullname}
              </h2>
              <div className={aStyle.formGroup}>
                <img
                  src={teacher.photo}
                  alt=""
                  className={cStyle.teacherPhoto}
                />
              </div>
              <div className={aStyle.formGroup}>
                <span className={aStyle.controlLabel}>email</span>
                <span className={aStyle.formControl}>{teacher.email}</span>
              </div>
              <div className={aStyle.formGroup}>
                <span className={aStyle.controlLabel}>course</span>
                <span className={aStyle.formControl}>{teacher.course}</span>
              </div>
              <div className={aStyle.formGroup}>
                <span className={aStyle.controlLabel}>Description</span>
                <div className={aStyle.formControl}>
                  {teacher.description}
                </div>
              </div>
              <div className={aStyle.formGroup}>
                <button type="button" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Request an appointment</button>
              </div>
              <button type="button" onClick={handlerRemoveTeacher}>Remove</button>
              <Link to={`/teacher/${id}/edit`}>Edit</Link>
            </div>
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
          </>
        )
      }
    </>
  );
};

TeacherDetails.propTypes = {
  getTeacherInfo: PropTypes.func.isRequired,
  removeTeacher: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  teacher: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  }),
};

TeacherDetails.defaultProps = {
  teacher: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetails);
