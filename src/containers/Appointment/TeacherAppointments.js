/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTeacherAppointmentsList, removeAppointment } from '../../redux/actions/appointments.actions';
import { getTeacherInfo } from '../../redux/actions/teachers.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  appointments: state.appointments.list,
  teacher: state.teachers.teacher,
});

const mapDispatchToProps = {
  getTeacherAppointmentsList,
  getTeacherInfo,
  removeAppointment,
};

const TeacherAppointments = props => {
  const {
    match,
    getTeacherAppointmentsList, removeAppointment, getTeacherInfo,
    appointments, requestapi, teacher,
  } = props;
  const { params } = match;
  const { id } = params;

  const [errors, setErrors] = useState([]);

  const handlerRemoveTeacherAppointment = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure?')) {
      const errorsList = [];
      removeAppointment(id).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        }
      });
    }
  };

  useEffect(() => {
    getTeacherInfo(id);
    getTeacherAppointmentsList(id);
  }, [id, getTeacherInfo, getTeacherAppointmentsList]);

  return (
    <>
      <h1 className="title-one green-color">
        Appointments
      </h1>
      <div className="card form-container mb-3">
        <h2 className="title-one text-center">
          Teacher appointments
        </h2>
        <div
          className="card-body"
          disabled={requestapi.working}
          aria-busy={requestapi.working}
        >
          <div className="row">
            <div className="col-12 offset-md-1 col-md-10 p-0">
              {
                teacher && (
                  <>
                    <div className="row">
                      <label className="col-12 col-md-6">
                        <span className="control-label">Teacher</span>
                        <span className="form-control">{teacher.fullname}</span>
                      </label>
                      <label className="col-12 col-md-6">
                        <span className="control-label">Course</span>
                        <span className="form-control">{teacher.course}</span>
                      </label>
                    </div>
                  </>
                )
              }
            </div>
            <div className="col-12 offset-md-1 col-md-10 p-0">
              <div className="table-responsive">
                {
                  appointments.length > 0
                    ? (
                      <>
                        <table className="table table-sm table-hover w-100">
                          <thead>
                            <tr>
                              <th colSpan="4">INCOMING APPOINTMENTS</th>
                            </tr>
                            <tr className="green-background">
                              <th>STUDENT</th>
                              <th>EMAIL</th>
                              <th colSpan="2">SCHEDULED FOR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              appointments
                                .filter(item => item.status === 1)
                                .map(item => (
                                  <tr key={item.id}>
                                    <td>{item.user_fullname}</td>
                                    <td>{item.user_email}</td>
                                    <td>{item.scheduled_for.replace(':00.000Z', '').replace('T', ' ')}</td>
                                    <td>
                                      {
                                        !item.admin && (
                                          <button type="button" onClick={e => handlerRemoveTeacherAppointment(e, item.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        )
                                      }
                                    </td>
                                  </tr>
                                ))
                            }
                          </tbody>
                        </table>
                        <table className="table table-sm table-hover w-100 mt-3">
                          <thead>
                            <tr>
                              <th colSpan="3">PAST APPOINTMENTS</th>
                            </tr>
                            <tr className="green-background">
                              <th>STUDENT</th>
                              <th>EMAIL</th>
                              <th>SCHEDULED FOR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              appointments
                                .filter(item => item.status === 0)
                                .sort((a, b) => a - b)
                                .map(item => (
                                  <tr key={item.id}>
                                    <td>{item.user_fullname}</td>
                                    <td>{item.user_email}</td>
                                    <td>{item.scheduled_for.replace(':00.000Z', '').replace('T', ' ')}</td>
                                  </tr>
                                ))
                            }
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <h5 className="title-one">There are no appointments registered</h5>
                    )
                }
              </div>
              <div className="form-group">
                <ul className="list-group border-0">
                  {
                    (!requestapi.working)
                    && (
                      (errors.length > 0)
                      && (
                        errors
                          .map(item => (
                            <li key={item} className="list-group-item border-0">
                              <div className="alert alert-danger my-0">{item}</div>
                            </li>
                          ))
                      )
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TeacherAppointments.propTypes = {
  getTeacherInfo: PropTypes.func.isRequired,
  getTeacherAppointmentsList: PropTypes.func.isRequired,
  removeAppointment: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
  appointments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_fullname: PropTypes.string,
    user_email: PropTypes.string,
    scheduled_for: PropTypes.string,
    status: PropTypes.number,
  })),
  teacher: PropTypes.shape({
    fullname: PropTypes.string,
    course: PropTypes.string,
  }),
};

TeacherAppointments.defaultProps = {
  appointments: [],
  teacher: {
    fullname: '',
    course: '',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAppointments);
