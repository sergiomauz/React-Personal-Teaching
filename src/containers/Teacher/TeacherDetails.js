/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teachercard.module.css';

const TeacherDetails = () => {
  const txtEmail = useRef(null);
  const txtCourse = useRef(null);
  const txtDescription = useRef(null);

  return (
    <>
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Teacher Details
      </h1>
      <div className={aStyle.formContainer} action="">
        <h2 className={aStyle.titleOne}>
          TEACHER S FULLNAME
        </h2>
        <div className={aStyle.formGroup}>
          <img
            src=""
            alt=""
            className={cStyle.teacherPhoto}
          />
        </div>
        <div className={aStyle.formGroup}>
          <span className={aStyle.controlLabel}>email</span>
          <span ref={txtEmail} className={aStyle.formControl}>E-Mail</span>
        </div>
        <div className={aStyle.formGroup}>
          <span className={aStyle.controlLabel}>course</span>
          <span ref={txtCourse} className={aStyle.formControl}>Course</span>
        </div>
        <div className={aStyle.formGroup}>
          <span className={aStyle.controlLabel}>Description</span>
          <div ref={txtDescription} className={aStyle.formControl}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing Lorem ipsum dolor sit amet,
            Lorem ipsum dolor sit amet, consect
          </div>
        </div>
        <div className={aStyle.formGroup}>
          <button type="button" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Request an appointment</button>
        </div>
      </div>
    </>
  );
};

export default TeacherDetails;
