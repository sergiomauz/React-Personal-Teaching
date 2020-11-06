/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import aStyle from '../styles/index.module.css';

const mapStateToProps = state => ({
  teachers: state.teachers.teachers,
});

const mapDispatchToProps = {
  getTeachersList,
};


const NewTeacher = () => {
  const txtFullname = useRef(null);
  const txtPhoto = useRef(null);
  const txtCourse = useRef(null);
  const txtEmail = useRef(null);
  const txtPassword = useRef(null);

  return (
    <>
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Teacher
      </h1>
      <form className={aStyle.formContainer} action="">
        <h2 className={aStyle.titleOne}>
          New Teacher
        </h2>
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
            <textarea ref={txtPassword} className={aStyle.formControl} maxLength="150" />
          </label>
        </div>
        <div className={aStyle.formGroup}>
          <button type="submit" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Save</button>
        </div>
      </form>
    </>
  );
};

export default NewTeacher;
