import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cStyle from '../styles/teachercard.module.css';

const TeacherCard = props => {
  const { info } = props;

  return (
    <div className={cStyle.teacherCard}>
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
        <h3>{info.teacher}</h3>
        <h5>{info.course}</h5>
        <p>
          {info.description.length > 50 ? `${info.description.slice(0, 50)} ...` : `${info.description}`}
        </p>
      </div>
    </div>
  );
};

TeacherCard.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    teacher: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default TeacherCard;
