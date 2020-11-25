import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUsersList } from '../../redux/actions/users.actions';

import aStyle from '../../styles/index.module.css';

const mapStateToProps = state => ({
  users: state.users.list,
});

const mapDispatchToProps = {
  getUsersList,
};

const UsersList = props => {
  const {
    getUsersList, users,
  } = props;

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

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
              <table>
                {
                  users.map(item => (
                    <tr key={item.id}>
                      <td>{item.fullname}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td><button type="button">Delete</button></td>
                    </tr>
                  ))
                }
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
