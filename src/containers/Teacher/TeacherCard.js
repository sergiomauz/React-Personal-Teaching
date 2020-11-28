/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  removeTeacher,
} from '../../redux/actions/teachers.actions';

import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teachercard.module.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  teachers: state.teachers,
});

const mapDispatchToProps = {
  removeTeacher,
};

const TeacherCard = props => {
  const {
    info,
    requestapi,
    removeTeacher,
  } = props;

  const handlerRemoveTeacher = e => {
    e.preventDefault();
    const errorsList = [];
    if (window.confirm('Are you sure?')) {
      removeTeacher(info.id).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
        }
      });
    }
  };

  return (
    <div
      className={cStyle.teacherCard}
      disabled={requestapi.working}
      aria-busy={requestapi.working}
    >
      <div className={cStyle.photoContainer}>
        <Link to={`/teacher/${info.id}`}>
          <img
            src={info.photo}
            alt=""
            className={cStyle.teacherPhoto}
          />
        </Link>
      </div>
      <div className={cStyle.teacherInfo}>
        <h3>{info.fullname}</h3>
        <h5>{info.course}</h5>
        <p>
          {info.description.length > 50 ? `${info.description.slice(0, 50)} ...` : `${info.description}`}
        </p>
      </div>
      <div className={aStyle.formGroup}>
        <button type="button" onClick={handlerRemoveTeacher}>Remove</button>
        <Link to={`/teacher/${info.id}/edit`}>Edit</Link>
      </div>
    </div>
  );
};

TeacherCard.propTypes = {
  removeTeacher: PropTypes.func.isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  info: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCard);