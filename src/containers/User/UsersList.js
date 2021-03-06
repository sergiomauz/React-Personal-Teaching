/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUsersList, removeUser } from '../../redux/actions/users.actions';
import ErrorsList from '../../components/ErrorsList';

import loadingGif from '../../images/loading.svg';
import '../../styles/formal.css';

const mapStateToProps = state => ({
  users: state.users.list,
});

const mapDispatchToProps = {
  getUsersList,
  removeUser,
};

const UsersList = props => {
  const {
    getUsersList, removeUser,
    users,
  } = props;

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlerRemoveUser = (e, id) => {
    e.preventDefault();

    if (window.confirm('Are you sure?')) {
      setLoading(true);
      const errorsList = [];
      removeUser(id).then(requestedData => {
        if (requestedData.error) {
          errorsList.push(requestedData.error.message);
          setErrors(errorsList);
        }
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    const errorsList = [];
    getUsersList().then(requestedData => {
      if (requestedData.error) {
        errorsList.push(requestedData.error.message);
        setErrors(errorsList);
      }
      setLoading(false);
    });
  }, [getUsersList]);

  return (
    <>
      <h1 className="title-one green-color text-center">
        Users
      </h1>
      <div className="card form-container mb-3">
        <h2 className="title-one">
          Users List
        </h2>
        <div className="card-body" disabled={loading}>
          <div className="row">
            {
              !loading ? (
                <div className="col-12 offset-md-1 col-md-10 p-0">
                  <div className="table-responsive">
                    {
                      users.length > 0 ? (
                        <table className="table table-sm table-hover">
                          <thead className="green-background">
                            <tr>
                              <th className="text-center">FULLNAME</th>
                              <th className="text-center">EMAIL</th>
                              <th className="text-center">USERNAME</th>
                              <th colSpan="2" className="text-center">-</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              users.map(item => (
                                <tr key={item.id}>
                                  <td>
                                    {
                                      item.admin && <span className="badge badge-info mr-2 p-1">admin</span>
                                    }
                                    <span>{item.fullname}</span>
                                  </td>
                                  <td>{item.email}</td>
                                  <td>{item.username}</td>
                                  <td>
                                    <Link to={`/user/${item.id}/edit`} className="btn btn-sm btn-outline-info">Edit</Link>
                                  </td>
                                  <td>
                                    {
                                      !item.admin && (
                                        <button type="button" onClick={e => handlerRemoveUser(e, item.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                      )
                                    }
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      )
                        : (
                          <h5 className="title-one">There are no users registered</h5>
                        )
                    }
                  </div>
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

UsersList.propTypes = {
  getUsersList: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    admin: PropTypes.bool,
  })),
};

UsersList.defaultProps = {
  users: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
