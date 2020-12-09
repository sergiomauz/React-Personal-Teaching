/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserAppointmentsList, removeAppointment } from '../../redux/actions/appointments.actions';

import loadingGif from '../../images/loading.gif';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  appointments: state.appointments.list,
});

const mapDispatchToProps = {
  getUserAppointmentsList,
  removeAppointment,
};

const UserAppointments = props => {
  const {
    getUserAppointmentsList, removeAppointment,
    appointments,
  } = props;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handlerRemoveUserAppointment = (e, id) => {
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
    setLoading(true);

    const errorsList = [];
    getUserAppointmentsList().then(requestedData => {
      if (requestedData.error) {
        errorsList.push(requestedData.error.message);
        setErrors(errorsList);
      }
      setLoading(false);
    });
  }, [getUserAppointmentsList]);

  return (
    <>
      <h1 className="title-one green-color">
        Appointments
      </h1>
      <div className="card form-container mb-3">
        <h2 className="title-one text-center">
          My appointments
        </h2>
        <div className="card-body">
          <div className="row">

            {
              !loading ? (
                <div className="col-12 offset-md-1 col-md-10 p-0">
                  {
                    appointments.length > 0
                      ? (
                        <div className="table-responsive">
                          <table className="table table-sm table-hover w-100">
                            <thead>
                              <tr>
                                <th colSpan="4">INCOMING APPOINTMENTS</th>
                              </tr>
                              <tr className="green-background">
                                <th>COURSE</th>
                                <th>TEACHER</th>
                                <th colSpan="2">SCHEDULED FOR</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                appointments
                                  .filter(item => item.status === 1)
                                  .map(item => (
                                    <tr key={item.id}>
                                      <td>
                                        {item.course}
                                      </td>
                                      <td>{item.teacher_fullname}</td>
                                      <td>{item.scheduled_for.replace(':00.000Z', '').replace('T', ' ')}</td>
                                      <td>
                                        {
                                          !item.admin && (
                                            <button type="button" onClick={e => handlerRemoveUserAppointment(e, item.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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
                                <th>COURSE</th>
                                <th>TEACHER</th>
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
                                      <td>
                                        {item.course}
                                      </td>
                                      <td>{item.teacher_fullname}</td>
                                      <td>{item.scheduled_for.replace(':00.000Z', '').replace('T', ' ')}</td>
                                    </tr>
                                  ))
                              }
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <h5 className="title-one">There are no appointments registered</h5>
                      )
                  }
                  <div className="form-group">
                    <ul className="list-group border-0">
                      {
                        (!loading)
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
              )
                : (
                  <div className="col-12 text-center">
                    <img src={loadingGif} alt="Preview" />
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
};

UserAppointments.propTypes = {
  getUserAppointmentsList: PropTypes.func.isRequired,
  removeAppointment: PropTypes.func.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    teacher_fullname: PropTypes.string,
    course: PropTypes.string,
    scheduled_for: PropTypes.string,
    status: PropTypes.number,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAppointments);
