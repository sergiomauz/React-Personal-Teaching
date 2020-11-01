import React from 'react';
import aStyle from '../styles/index.module.css';
import cStyle from '../styles/sidebar.module.css';

const Sidebar = () => (
  <div className={cStyle.sidebarWrapper}>
    <div className={`${cStyle.sidebarHeading} ${aStyle.dFlex} ${aStyle.justifyContentCenter}`}>
      <div className={cStyle.sidebarLogo} />
    </div>
    <ul className={aStyle.listGroup}>
      <li className={`${aStyle.listGroupItem}`}>
        <a className={`${aStyle.listGroupItemAction}`} href="/">
          Teachers
        </a>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <a className={`${aStyle.listGroupItemAction}`} href="/">
          Appointments
        </a>
      </li>
      <li className={`${aStyle.listGroupItem}`}>
        <a className={`${aStyle.listGroupItemAction}`} href="/">
          Sign out
        </a>
      </li>
    </ul>

    <div className={cStyle.sidebarBottom}>
      <div className={cStyle.sidebarSocialContainer}>
        <a href="/">
          <i className="fab fa-twitter" />
        </a>
        <a href="/">
          <i className="fab fa-facebook-f" />
        </a>
        <a href="/">
          <i className="fab fa-google-plus-g" />
        </a>
        <a href="/">
          <i className="fab fa-vimeo-v" />
        </a>
        <a href="/">
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
