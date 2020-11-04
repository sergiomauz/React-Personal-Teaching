import React from 'react';
import TeacherCard from '../components/TeacherCard';
import aStyle from '../styles/index.module.css';
import cStyle from '../styles/teacherslist.module.css';

const temporalTeachers = [
  {
    id: 1,
    teacher: 'Sergio Zambrano',
    course: 'Computer Science',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    photo: 'https://www.expreso.com.pe/wp-content/uploads/2018/09/C%C3%A9sar-Hildebrandt.jpg',
  },
  {
    id: 2,
    teacher: 'Joicy Cuadros',
    course: 'English Grammar',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    photo: 'https://www.internautas.org/graficos/Ofelia_Tejerina_mujer_activista.jpg',
  },
];

const TeachersList = () => (
  <>
    <h1 className={`${aStyle.titleOne} ${aStyle.greenColor}`}>
      Teachers List
    </h1>
    <div className={cStyle.carousel}>
      <ul className={cStyle.carouselInner}>
        {
          temporalTeachers.map(item => (
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
    </div>
  </>
);

export default TeachersList;
