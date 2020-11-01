import React from 'react';
import { Link } from 'react-router-dom';
import aStyle from '../styles/index.module.css';
import cStyle from '../styles/sidebar.module.css';

const Sidebar = () => (
  <div className={cStyle.sidebarWrapper}>
    <div className={`${cStyle.sidebarHeading} ${aStyle.dFlex} ${aStyle.justifyContentCenter}`}>
      <div className={cStyle.sidebarLogo} />
    </div>
    <ul className={aStyle.listGroup}>
      <li className={`${aStyle.listGroupItem}`}>
        <Link className={`${aStyle.listGroupItemAction}`} to="/signin">
          Sign In
        </Link>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <Link className={`${aStyle.listGroupItemAction}`} to="/signup">
          Sign Up
        </Link>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <Link className={`${aStyle.listGroupItemAction}`} to="/teachers">
          Teachers
        </Link>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <Link className={`${aStyle.listGroupItemAction}`} to="/teacher/new">
          New Teacher
        </Link>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <Link className={`${aStyle.listGroupItemAction}`} to="/appointments">
          Appointments
        </Link>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <Link className={`${aStyle.listGroupItemAction}`} to="/">
          Sign out
        </Link>
      </li>
    </ul>

    <div className={cStyle.sidebarBottom}>
      <div className={cStyle.sidebarSocialContainer}>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f" />
        </a>
        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
          <i className="fab fa-google-plus-g" />
        </a>
        <a href="https://vimeo.com/" target="_blank" rel="noreferrer">
          <i className="fab fa-vimeo-v" />
        </a>
        <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
          <i className="fab fa-pinterest-p" />
        </a>
      </div>
      <div className={cStyle.sidebarTrademark}>
        React Personal Teachers &trade; &reg;
      </div>
    </div>
  </div>
);

export default Sidebar;
