/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUsersList, removeUser } from '../../redux/actions/users.actions';

import aStyle from '../../styles/index.module.css';

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
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Users List
      </h1>
      <div>
        {
          users.length > 0
          && (
            <>
              <table className={aStyle.table}>
                <tbody>
                  {
                    users.map(item => (
                      <tr key={item.id}>
                        <td>{item.fullname}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td><Link to={`/user/${item.id}/edit`}>Edit</Link></td>
                        <td><button type="button" onClick={e => handlerRemoveUser(e, item.id)}>Delete</button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </>
          )
        }
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
  })),
};

UsersList.defaultProps = {
  users: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
