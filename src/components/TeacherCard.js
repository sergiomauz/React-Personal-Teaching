import React from 'react';
import cStyle from '../styles/teachercard.module.css';

const TeacherCard = () => (
  <div className={cStyle.teacherCard}>
    <div className={cStyle.photoContainer}>
      <img
        src="https://www.internautas.org/graficos/Ofelia_Tejerina_mujer_activista.jpg"
        alt=""
        className={cStyle.teacherPhoto} />
    </div>
    <div className={cStyle.teacherInfo}>
      <h3>Teacher Name</h3>
      <h5>Course for learning</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adip</p>
    </div>
  </div>
);

export default TeacherCard;
