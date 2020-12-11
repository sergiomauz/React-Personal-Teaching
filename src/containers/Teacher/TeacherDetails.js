/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ErrorsList from '../../components/ErrorsList';
import { URL_USER_APPOINTMENTS } from '../../helpers/constants';
import {
  getTeacherInfo,
  removeTeacher,
  getTeacherAvailability,
  clearTeacherAvailability,
} from '../../redux/actions/teachers.actions';
import { addAppointment } from '../../redux/actions/appointments.actions';

import photoTeacher from '../../images/teacher.jpg';
import loadingGif from '../../images/loading.gif';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  teachers: state.teachers.list,
});

const mapDispatchToProps = {
  getTeacherInfo,
  removeTeacher,
  addAppointment,
  getTeacherAvailability,
  clearTeacherAvailability,
};

const TeacherDetails = props => {
  const {
    match,
    teachers,
    getTeacherInfo, addAppointment, getTeacherAvailability, clearTeacherAvailability,
  } = props;
  const { params } = match;
  const { id } = params;

  const txtAppointmentDate = useRef(null);

  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacherInfo, setTeacherInfo] = useState(null);

  const lookForErrors = () => {
    const errorsList = [];

    if (txtAppointmentDate.current.value.length === 0) {
      errorsList.push('Select a date to schedule an appointment');
    }

    return errorsList;
  };

  const handlerSaveAppointment = (e, time) => {
    e.preventDefault();

    if (window.confirm('Are you sure?')) {
      const [teacher_id, scheduled_for] = [
        id,
        `${txtAppointmentDate.current.value} ${time}:00`,
      ];
      setLoading(true);
      addAppointment({
        teacher_id, scheduled_for,
      }).then(requestedData => {
        if (!requestedData.error) {
          history.push(URL_USER_APPOINTMENTS);
        } else {
          setLoading(false);
        }
      });
    }
  };

  const handlerGetAvailability = e => {
    e.preventDefault();

    setLoading(true);
    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
      setLoading(false);
    } else {
      const queryDate = txtAppointmentDate.current.value;
      getTeacherAvailability(id, queryDate)
        .then(requestedData => {
          if (requestedData.error) {
            errorsList.push(requestedData.error.message);
          } else if (requestedData.availability) {
            if (requestedData.availability.length === 0) {
              errorsList.push('There are no availability for this day.');
            }
          }
          setErrors(errorsList);
          setLoading(false);
        });
    }
  };

  const handlerCleanAvailability = () => {
    setErrors([]);
    clearTeacherAvailability();
  };

  useEffect(() => {
    const errorsList = [];
    getTeacherInfo(id).then(requestedData => {
      if (requestedData.error) {
        errorsList.push(requestedData.error.message);
        setErrors(errorsList);
      }
      setLoading(false);
    });
  }, [id, getTeacherInfo]);

  useEffect(() => {
    const filteredTeacher = teachers.filter(teacher => teacher.id === parseInt(id, 10));
    setTeacherInfo(filteredTeacher[0]);
  }, [teachers, id, setTeacherInfo]);

  return (
    <>
      <h1 className="title-one green-color">
        Teacher Details
      </h1>
      <div className="card form-container mb-5">
        <div className="card-body" disabled={loading}>
          <div className="row">
            {
              teacherInfo ? (
                <>
                  <div className="col-12 col-sm-6">
                    <div className="form-group text-center">
                      {
                        teacherInfo.photo.length > 0 ? (
                          <img
                            src={teacherInfo.photo}
                            alt=""
                            className="img-fluid teacher-photo"
                          />
                        )
                          : (
                            <img className="teacher-photo" src={photoTeacher} alt="Preview" />
                          )
                      }
                    </div>
                    <div className="form-group">
                      <span className="control-label">fullname</span>
                      <span className="form-control">{teacherInfo.fullname}</span>
                    </div>
                    <div className="form-group">
                      <span className="control-label">email</span>
                      <span className="form-control">{teacherInfo.email}</span>
                    </div>
                    <div className="form-group">
                      <span className="control-label">course</span>
                      <span className="form-control">{teacherInfo.course}</span>
                    </div>
                    <div className="form-group">
                      <span className="control-label">Description</span>
                      <div className="form-control">
                        {teacherInfo.description}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <h5 className="green-color mt-3 text-center">Request an appointment</h5>
                    <div className="form-group d-flex align-items-end">
                      <label className="p-0 m-0 w-100">
                        <span className="control-label">date</span>
                        <input
                          ref={txtAppointmentDate}
                          type="date"
                          className="form-control"
                          onFocus={handlerCleanAvailability}
                          onChange={() => {
                            if (txtAppointmentDate.current.value.length === 0) {
                              handlerCleanAvailability();
                            }
                          }}
                        />
                      </label>
                      <div className="form-group-append">
                        <button type="button" className="btn btn-success" onClick={handlerGetAvailability}>
                          <i className="fa fa-search" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      {
                        teacherInfo.availability && (
                          teacherInfo.availability.length > 0 && (
                            <>
                              <span className="badge badge-success">Availability</span>
                              <div className="d-flex flex-wrap justify-content-around">
                                {
                                  teacherInfo.availability
                                    .map(
                                      item => (
                                        <button type="button" key={item} onClick={e => handlerSaveAppointment(e, item)} className="btn btn-outline-success mr-1 mt-2">
                                          {`${`00${item}`.slice(-2)}:00 - ${`00${item + 1}`.slice(-2)}:00`}
                                        </button>
                                      ),
                                    )
                                }
                              </div>
                            </>
                          )
                        )
                      }
                    </div>
                  </div>
                </>
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

TeacherDetails.propTypes = {
  getTeacherInfo: PropTypes.func.isRequired,
  addAppointment: PropTypes.func.isRequired,
  getTeacherAvailability: PropTypes.func.isRequired,
  clearTeacherAvailability: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    availability: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetails);
