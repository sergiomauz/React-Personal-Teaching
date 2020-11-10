import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TeacherCard from '../../components/TeacherCard';
import { getTeachersList } from '../../redux/actions/teachers.actions';
import aStyle from '../../styles/index.module.css';
import cStyle from '../../styles/teacherslist.module.css';

const mapStateToProps = state => ({
  teachers: state.teachers.teachers,
});

const mapDispatchToProps = {
  getTeachersList,
};

const TeachersList = props => {
  const { getTeachersList, teachers } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachersList();
    setLoading(false);
  }, [getTeachersList]);

  return (
    <>
      <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
        Teachers List
      </h1>
      <div className={cStyle.carousel}>
        {
          loading
          && <span>Loading...</span>
        }
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
