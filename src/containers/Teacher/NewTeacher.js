/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTeacher } from '../../redux/actions/teachers.actions';
import aStyle from '../../styles/index.module.css';

// const mapStateToProps = state => ({

// });

const mapDispatchToProps = {
  addTeacher,
};

const NewTeacher = props => {
  const { addTeacher } = props;
  const [loading, setLoading] = useState(true);

  const txtFullname = useRef(null);
  const txtEmail = useRef(null);
  const txtPhoto = useRef(null);
  const txtCourse = useRef(null);
  const txtDescription = useRef(null);

  useEffect(() => {
    setLoading(false);
  });

  const saveTeacher = e => {
    e.preventDefault();
    const [fullname, email, photo, course, description] = [
      txtFullname.current.value,
      txtEmail.current.value,
      txtPhoto.current.value,
      txtCourse.current.value,
      txtDescription.current.value,
    ];

    const newTeacher = {
      fullname, email, photo, course, description,
    };

    addTeacher(newTeacher);
  };

  return (
    <>
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Teacher
      </h1>
      {
        loading
        && <span>Loading...</span>
      }
      <form className={aStyle.formContainer} onSubmit={saveTeacher}>
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
            <textarea ref={txtDescription} className={aStyle.formControl} maxLength="150" />
          </label>
        </div>
        <div className={aStyle.formGroup}>
          <button type="submit" className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}>Save</button>
        </div>
      </form>

    </>
  );
};

NewTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps)(NewTeacher);
export default connect(null, mapDispatchToProps)(NewTeacher);
