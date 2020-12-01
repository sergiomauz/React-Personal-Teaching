import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TeacherCard from './TeacherCard';
import { getTeachersList } from '../../redux/actions/teachers.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  teachers: state.teachers.list,
});

const mapDispatchToProps = {
  getTeachersList,
};

const TeachersList = props => {
  const {
    teachers,
    getTeachersList,
  } = props;

  const [selectedCard, setSelectedCard] = useState(0);

  const handlerMovePreviousCard = e => {
    e.preventDefault();
    if (selectedCard === 0) {
      setSelectedCard(teachers.length - 1);
    } else {
      setSelectedCard(selectedCard - 1);
    }
  };

  const handlerMoveNextCard = e => {
    e.preventDefault();
    if (selectedCard === teachers.length - 1) {
      setSelectedCard(0);
    } else {
      setSelectedCard(selectedCard + 1);
    }
  };

  useEffect(() => {
    getTeachersList();
  }, [getTeachersList]);

  return (
    <>
      <h1 className="title-one green-color">
        Teachers List
      </h1>
      <div className="card form-container">
        <div className="card-body">
          <div className="row">
            <div className="col-12 p-0">
              {
                teachers.length > 0
                  ? (
                    <>
                      <div className="text-center w-100">
                        <TeacherCard info={teachers[selectedCard]} />
                      </div>
                      <div className="d-flex justify-content-between carousel-control-container">
                        <button type="button" className="carousel-control-left" onClick={handlerMovePreviousCard}>
                          <span className="carousel-control-prev-icon" />
                        </button>
                        <button type="button" className="carousel-control-right" onClick={handlerMoveNextCard}>
                          <span className="carousel-control-next-icon" />
                        </button>
                      </div>
                    </>
                  )
                  : (
                    <h3 className="title-one">There are no teachers registered</h3>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TeachersList.propTypes = {
  getTeachersList: PropTypes.func.isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    teacher: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  })),
};

TeachersList.defaultProps = {
  teachers: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList);
