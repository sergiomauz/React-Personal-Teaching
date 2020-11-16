import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TeacherCard from '../../components/TeacherCard';
import { getTeachersList } from '../../redux/actions/teachers.actions';

import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teacherslist.module.css';

const mapStateToProps = state => ({
  sessions: state.sessions,
  requestapi: state.requestapi,
  teachers: state.teachers.teachers,
});

const mapDispatchToProps = {
  getTeachersList,
};

const TeachersList = props => {
  const {
    sessions, requestapi,
    getTeachersList, teachers,
  } = props;

  useEffect(() => {
    getTeachersList();
  }, [getTeachersList]);

  return (
    <>
      {
        !sessions.signedIn
          ? (
            <Redirect to="/signin" />
          ) : (
            <>
              <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
                Teachers List
              </h1>
              <div className={cStyle.carousel}>
                {
                  teachers.length > 0
                  && (
                    <>
                      <ul className={cStyle.carouselInner}>
                        {
                          teachers.map(item => (
                            <li key={item.id} className={cStyle.carouselItem}>
                              <TeacherCard info={item} />
                            </li>
                          ))
                        }
                      </ul>
                      <a className={cStyle.carouselControlPrev} href="/">
                        <span className={cStyle.carouselControlPrevIcon} />
                      </a>
                      <a className={cStyle.carouselControlNext} href="/">
                        <span className={cStyle.carouselControlNextIcon} />
                      </a>
                    </>
                  )
                }
              </div>
            </>
          )
      }
    </>
  );
};

TeachersList.propTypes = {
  getTeachersList: PropTypes.func.isRequired,
  sessions: PropTypes.shape({
    signedIn: PropTypes.bool,
  }).isRequired,
  requestapi: PropTypes.shape({
    working: PropTypes.bool,
    success: PropTypes.bool,
    details: PropTypes.shape({
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
  }).isRequired,
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
