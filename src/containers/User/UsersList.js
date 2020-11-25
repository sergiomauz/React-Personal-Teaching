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
    getUsersList, teachers,
  } = props;

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  return (
    <>
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Teachers List
      </h1>
      <div>
        {
          teachers.length > 0
          && (
            <>
              <ul className={cStyle.carouselInner}>
                {
                  teachers.map(item => (
                    <li key={item.id}>

                    </li>
                  ))
                }
              </ul>
            </>
          )
        }
      </div>
    </>
  );
};

UsersList.propTypes = {
  getUsersList: PropTypes.func.isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    teacher: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  })),
};

UsersList.defaultProps = {
  teachers: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
