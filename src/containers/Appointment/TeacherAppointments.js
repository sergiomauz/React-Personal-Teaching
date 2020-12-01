import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getTeacherAppointmentsList } from '../../redux/actions/appointments.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  appointments: state.appointments.list,
});

const mapDispatchToProps = {
  getTeacherAppointmentsList,
};

const TeacherAppointments = props => {
  const {
    requestapi,
    getTeacherAppointmentsList,
    Appointments,
  } = props;

  useEffect(() => {
    getTeacherAppointmentsList();
  }, [getTeacherAppointmentsList]);

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
              <div className="table-responsive">
                TeacherAppointments
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TeacherAppointments.propTypes = {
  getTeacherAppointmentsList: PropTypes.func.isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAppointments);
