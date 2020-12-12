import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import photoTeacher from '../../images/teacher.jpg';
import loadingGif from '../../images/loading.svg';
import '../../styles/formal.css';

const TeacherCard = props => {
  const { info } = props;

  return (
    <div className="card border-0">
      {
        info ? (
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
          : (
            <div className="col-12 text-center">
              <img src={loadingGif} alt="Preview" />
            </div>
          )
      }
    </div>
  );
};

TeacherCard.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default TeacherCard;
