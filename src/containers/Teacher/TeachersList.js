import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TeacherCard from './TeacherCard';
import { getTeachersList } from '../../redux/actions/teachers.actions';

import '../../styles/formal.css';

const mapStateToProps = state => ({
  teachers: state.teachers.list,
});

const mapDispatchToProps = {
  getTeachersList,
};

const TeachersList = props => {
  const {
    teachers,
    getTeachersList,
  } = props;

  useEffect(() => {
    getTeachersList();
  }, [getTeachersList]);

  return (
    <>
      <h1 className="title-one green-color">
        Teachers List
      </h1>
      <div className="card form-container mb-5">
        <div className="card-body">
          <div className="row">
            <div className="col-12 p-0">
              {
                teachers.length > 0
                && (
                  <>
                    <button type="button" className="carousel-control-left">
                      <span className="carousel-control-prev-icon" />
                    </button>
                    <ul className="list-group text-center w-100">
                      {
                        teachers.map(item => (
                          <li key={item.id} className="list-group-item border-0">
                            <TeacherCard info={item} />
                          </li>
                        ))
                      }
                    </ul>
                    <button type="button" className="carousel-control-right">
                      <span className="carousel-control-next-icon" />
                    </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TeachersList.propTypes = {
  getTeachersList: PropTypes.func.isRequired,
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    teacher: PropTypes.string,
    course: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  })),
};

TeachersList.defaultProps = {
  teachers: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachersList);
