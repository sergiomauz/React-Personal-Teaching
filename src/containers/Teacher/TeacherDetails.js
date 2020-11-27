/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  URL_TEACHERS_LIST,
  URL_USER_APPOINTMENTS,
} from '../../helpers/constants';
import {
  getTeacherInfo,
  removeTeacher,
  getTeacherAvailability,
  clearTeacherAvailability,
} from '../../redux/actions/teachers.actions';
import { addAppointment } from '../../redux/actions/appointments.actions';

import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teachercard.module.css';

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
    getTeacherInfo, addAppointment, getTeacherAvailability, clearTeacherAvailability,
    requestapi, teacher,
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

    const [teachers_id, scheduled_for] = [
      id,
      `${txtAppointmentDate.current.value} ${time}:00`,
    ];

    addAppointment({
      teachers_id, scheduled_for,
    }).then(requestedData => {
      if (!requestedData.error) {
        history.push(URL_USER_APPOINTMENTS);
      }
    });
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
          }
          setErrors(errorsList);
        });
    }
  };

  const handlerCleanAvailability = () => {
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
            <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
              Teacher Details
            </h1>
            <div
              className={aStyle.formContainer}
              disabled={requestapi.working}
              aria-busy={requestapi.working}
            >
              <div className={aStyle.row}>
                <div className={aStyle.colXs6}>
                  <h2 className={aStyle.titleOne}>
                    {teacher.fullname}
                  </h2>
                  <div className={aStyle.formGroup}>
                    <img
                      src={teacher.photo}
                      alt=""
                      className={cStyle.teacherPhoto}
                    />
                  </div>
                  <div className={aStyle.formGroup}>
                    <span className={aStyle.controlLabel}>email</span>
                    <span className={aStyle.formControl}>{teacher.email}</span>
                  </div>
                  <div className={aStyle.formGroup}>
                    <span className={aStyle.controlLabel}>course</span>
                    <span className={aStyle.formControl}>{teacher.course}</span>
                  </div>
                  <div className={aStyle.formGroup}>
                    <span className={aStyle.controlLabel}>Description</span>
                    <div className={aStyle.formControl}>
                      {teacher.description}
                    </div>
                  </div>
                </div>
                <div className={aStyle.colXs6}>
                  <div className={aStyle.formGroup}>
                    <label>
                      <span className={aStyle.controlLabel}>date</span>
                      <input
                        ref={txtAppointmentDate}
                        type="date"
                        className={aStyle.formControl}
                        maxLength="50"
                        onFocus={handlerCleanAvailability}
                      />
                    </label>
                  </div>
                  <div className={aStyle.formGroup}>
                    <button
                      type="button"
                      className={`${aStyle.btn} ${aStyle.centerBlock} ${aStyle.my3}`}
                      onClick={handlerGetAvailability}
                    >
                      Request an appointment
                  </button>
                  </div>
                  <div className={aStyle.formGroup}>
                    <ul className={aStyle.listGroupWithoutIcon}>
                      {
                        (!requestapi.working)
                        && (
                          (errors.length > 0)
                          && (
                            errors
                              .map(item => <li key={item} className={aStyle.alertDanger}>{item}</li>)
                          )
                        )
                      }
                    </ul>
                  </div>
                  <div className={aStyle.formGroup}>
                    <ul className={aStyle.listGroupWithoutIcon}>
                      {
                        teacher.availability && (
                          teacher.availability.length > 0
                          && teacher.availability
                            .map(
                              item => (
                                <li key={item}>
                                  <button type="button" onClick={e => handlerSaveAppointment(e, item)} className={`${aStyle.btn} ${aStyle.alertSuccess}`}>
                                    {`${item}:00 - ${item + 1}:00`}
                                  </button>
                                </li>
                              ),
                            )
                        )
                      }
                    </ul>
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
