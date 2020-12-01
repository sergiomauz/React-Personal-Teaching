/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { URL_USER_APPOINTMENTS } from '../../helpers/constants';
import {
  getTeacherInfo,
  removeTeacher,
  getTeacherAvailability,
  clearTeacherAvailability,
} from '../../redux/actions/teachers.actions';
import { addAppointment } from '../../redux/actions/appointments.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  teacher: state.teachers.teacher,
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
    requestapi, teacher,
    getTeacherInfo, addAppointment, getTeacherAvailability, clearTeacherAvailability,
  } = props;
  const { params } = match;
  const { id } = params;

  const txtAppointmentDate = useRef(null);

  const history = useHistory();

  const [errors, setErrors] = useState([]);

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

      addAppointment({
        teacher_id, scheduled_for,
      }).then(requestedData => {
        if (!requestedData.error) {
          history.push(URL_USER_APPOINTMENTS);
        }
      });
    }
  };

  const handlerGetAvailability = e => {
    e.preventDefault();

    const errorsList = lookForErrors();
    if (errorsList.length > 0) {
      setErrors(errorsList);
    } else {
      const queryDate = txtAppointmentDate.current.value;
      getTeacherAvailability(id, queryDate)
        .then(requestedData => {
          if (requestedData.error) {
            errorsList.push(requestedData.error.message);
          } else if (requestedData.availability) {
            if (requestedData.availability.length === 0) {
              errorsList.push('This day will be really busy.');
            }
          }
          setErrors(errorsList);
        });
    }
  };

  const handlerCleanAvailability = () => {
    setErrors([]);
    clearTeacherAvailability();
  };

  useEffect(() => {
    getTeacherInfo(id);
  }, [id, getTeacherInfo]);

  return (
    <>
      {
        teacher && (
          <>
            <h1 className="title-one green-color">
              Teacher Details
            </h1>
            <div
              className="card form-container mb-5"
              disabled={requestapi.working}
              aria-busy={requestapi.working}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group text-center">
                      <img
                        src={teacher.photo}
                        alt=""
                        className="img-fluid teacher-photo"
                      />
                    </div>
                    <div className="form-group">
                      <span className="control-label">fullname</span>
                      <span className="form-control">{teacher.fullname}</span>
                    </div>
                    <div className="form-group">
                      <span className="control-label">email</span>
                      <span className="form-control">{teacher.email}</span>
                    </div>
                    <div className="form-group">
                      <span className="control-label">course</span>
                      <span className="form-control">{teacher.course}</span>
                    </div>
                    <div className="form-group">
                      <span className="control-label">Description</span>
                      <div className="form-control">
                        {teacher.description}
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
                        teacher.availability && (
                          teacher.availability.length > 0 && (
                            <>
                              <span className="badge badge-success">Availability</span>
                              <div className="d-flex flex-wrap justify-content-around">
                                {
                                  teacher.availability
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
                    <div className="form-group">
                      {
                        (!requestapi.working)
                        && (
                          (errors.length > 0)
                          && (
                            errors
                              .map(item => <div key={item} className="alert alert-danger">{item}</div>)
                          )
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
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
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  teacher: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    availability: PropTypes.arrayOf(PropTypes.number),
  }),
};

TeacherDetails.defaultProps = {
  teacher: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetails);
