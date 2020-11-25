/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTeacherInfo } from '../../redux/actions/teachers.actions';

import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teachercard.module.css';

const mapStateToProps = state => ({
  teacher: state.teachers.teacher,
});

const mapDispatchToProps = {
  getTeacherInfo,
};

const TeacherDetails = props => {
  const {
    getTeacherInfo, match,
    teacher,
  } = props;
  const { params } = match;
  const { id } = params;

  useEffect(() => {
    getTeacherInfo(id);
  }, [getTeacherInfo]);

  return (
    <>
      {
        teacher && (
          <>
            <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
              Teacher Details
            </h1>
            <div className={aStyle.formContainer} action="">
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
            </div>
          </>
        )
      }
    </>
  );
};

TeacherDetails.propTypes = {
  getTeacherInfo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
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
