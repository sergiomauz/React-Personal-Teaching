/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import photoTeacher from '../../images/teacher.jpg';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
});

const TeacherCard = props => {
  const {
    info,
    requestapi,
  } = props;

  return (
    <div
      className="card border-0"
      disabled={requestapi.working}
      aria-busy={requestapi.working}
    >
      {
        info && (
          <>
            <Link to={`/teacher/${info.id}`} className="form-group">
              {
                info.photo.length > 0 ? (
                  <img
                    src={info.photo}
                    alt=""
                    className="img-fluid teacher-photo"
                  />
                )
                  : (
                    <img className="teacher-photo" src={photoTeacher} alt="Preview" />
                  )
              }
            </Link>
            <div className="form-group">
              <h3>{info.fullname}</h3>
              <h5>{info.course}</h5>
            </div>
          </>
        )
      }
    </div>
  );
};

TeacherCard.propTypes = {
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
  }).isRequired,
  info: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(TeacherCard);
