import React from 'react';
import TeacherCard from '../components/TeacherCard';
import cStyle from '../styles/teacherslist.module.css';

const TeachersList = () => (
  <>
    <h2>
      TeachersList
    </h2>
    <div className={cStyle.carousel}>
      <ul className={cStyle.carouselInner}>
        <li className={cStyle.carouselItem}>
          <TeacherCard />
        </li>
        {/* <li className={cStyle.carouselItem}>
          <TeacherCard />
        </li>
        <li className={cStyle.carouselItem}>
          <TeacherCard />
        </li>
        <li className={cStyle.carouselItem}>
          <TeacherCard />
        </li>
        <li className={cStyle.carouselItem}>
          <TeacherCard />
        </li>
        <li className={cStyle.carouselItem}>
          <TeacherCard />
        </li> */}
      </ul>

      <a className={cStyle.carouselControlPrev} href="/">
        <span className={cStyle.carouselControlPrevIcon} />
      </a>

      <a className={cStyle.carouselControlNext} href="/">
        <span className={cStyle.carouselControlNextIcon} />
      </a>
    </div>
  </>
);

export default TeachersList;
