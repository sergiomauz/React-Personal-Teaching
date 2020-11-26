import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import cStyle from '../../styles/teachercard.module.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  teachers: state.teachers,
});

const TeacherCard = props => {
  const {
    info,
    requestapi,
  } = props;

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
    </div>
  );
};

TeacherCard.propTypes = {
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

export default connect(mapStateToProps)(TeacherCard);
