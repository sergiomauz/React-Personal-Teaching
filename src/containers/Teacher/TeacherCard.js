/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeTeacher } from '../../redux/actions/teachers.actions';

import '../../styles/formal.css';

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
      className="card border-0"
      disabled={requestapi.working}
      aria-busy={requestapi.working}
    >

      <Link to={`/teacher/${info.id}`} className="form-group">
        <img
          src={info.photo}
          alt=""
          className="img-fluid teacher-photo"
        />
      </Link>
      <div className="form-group">
        <h3>{info.fullname}</h3>
        <h5>{info.course}</h5>
      </div>
      <div className="d-flex justify-content-center">
        <Link to={`/teacher/${info.id}/appointments`} className="btn btn-outline-success">Appointments</Link>
        <Link to={`/teacher/${info.id}/edit`} className="btn btn-outline-info mx-2">Edit</Link>
        <button type="button" onClick={handlerRemoveTeacher} className="btn btn-outline-danger">Remove</button>
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
