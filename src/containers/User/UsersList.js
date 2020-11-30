/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUsersList, removeUser } from '../../redux/actions/users.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  requestapi: state.requestapi,
  users: state.users.list,
});

const mapDispatchToProps = {
  getUsersList,
  removeUser,
};

const UsersList = props => {
  const {
    requestapi,
    getUsersList, removeUser,
    users,
  } = props;

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  const handlerRemoveUser = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure?')) {
      removeUser(id);
    }
  };

  return (
    <>
      <h1 className="title-one green-color">
        Users
      </h1>
      <div className="card form-container mb-3">
        <h2 className="title-one">
          Users List
        </h2>
        <div
          className="card-body"
          disabled={requestapi.working}
          aria-busy={requestapi.working}
        >
          <div className="row">
            <div className="col-12 offset-md-1 col-md-10 p-0">
              <div className="table-responsive">
                {
                  users.length > 0
                  && (
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
                              <td className="d-flex">
                                {
                                  item.admin && <div className="badge badge-info mr-2 p-1">admin</div>
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
                }
              </div>
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
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
    details: PropTypes.shape({
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
  }).isRequired,
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
