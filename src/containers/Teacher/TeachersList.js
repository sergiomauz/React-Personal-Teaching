/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorsList from '../../components/ErrorsList';
import TeacherCard from './TeacherCard';
import { getTeachersList, removeTeacher } from '../../redux/actions/teachers.actions';

import loadingGif from '../../images/loading.svg';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  teachers: state.teachers.list,
  myProfile: state.users.myProfile,
});

const mapDispatchToProps = {
  getTeachersList, removeTeacher,
};

const TeachersList = props => {
  const {
    teachers, myProfile,
    getTeachersList, removeTeacher,
  } = props;

  const [selectedCard, setSelectedCard] = useState(0);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handlerRemoveTeacher = (e, id) => {
    e.preventDefault();

    if (window.confirm('Are you sure?')) {
      setLoading(true);
      const errorsList = [];
      removeTeacher(id).then(requestedData => {
        if (!requestedData.error) {
          if (selectedCard === 0) {
            setSelectedCard(0);
          } else {
            setSelectedCard(selectedCard - 1);
          }
        } else {
          errorsList.push(requestedData.error.message);
        }
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    const errorsList = [];
    getTeachersList().then(requestedData => {
      if (requestedData.error) {
        errorsList.push(requestedData.error.message);
        setErrors(errorsList);
      }
      setLoading(false);
    });
  }, [getTeachersList]);

  return (
    <>
      <h1 className="title-one green-color text-center">
        Teachers List
      </h1>
      <div className="card form-container mb-3">
        <div className="card-body" disabled={loading}>
          <div className="row">
            {
              !loading ? (
                <div className="col-12 p-0">
                  {
                    teachers.length > 0 ? (
                      <>
                        <div className="text-center w-100">
                          <TeacherCard info={teachers[selectedCard]} />
                          {
                            myProfile && (
                              <>
                                {
                                  myProfile.admin && (
                                    <div className="d-flex justify-content-center">
                                      <Link to={`/teacher/${teachers[selectedCard].id}/appointments`} className="btn btn-outline-success">Appointments</Link>
                                      <Link to={`/teacher/${teachers[selectedCard].id}/edit`} className="btn btn-outline-info mx-2">Edit</Link>
                                      <button type="button" onClick={e => handlerRemoveTeacher(e, teachers[selectedCard].id)} className="btn btn-outline-danger">Remove</button>
                                    </div>
                                  )
                                }
                              </>
                            )
                          }
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
                        <h5 className="title-one">There are no teachers registered</h5>
                      )
                  }
                </div>
              )
                : (
                  <div className="col-12 text-center">
                    <img src={loadingGif} alt="Preview" />
                  </div>
                )
            }
            <div className="col-12">
              <ErrorsList errorsInfo={errors} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TeachersList.propTypes = {
  getTeachersList: PropTypes.func.isRequired,
  removeTeacher: PropTypes.func.isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    teacher: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  })),
  myProfile: PropTypes.shape({
    admin: PropTypes.bool,
  }),
};

TeachersList.defaultProps = {
  teachers: [],
  myProfile: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList);
