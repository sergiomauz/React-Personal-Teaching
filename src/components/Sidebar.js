import React from 'react';
import aStyle from '../styles/index.module.css';
import cStyle from '../styles/sidebar.module.css';

const Sidebar = () => (
  <div className={cStyle.sidebarWrapper}>
    <div className={`${cStyle.sidebarHeading} ${aStyle.dFlex} ${aStyle.justifyContentCenter}`}>
      <img className={cStyle.sidebarLogo} src="" alt="" />
    </div>
    <div className={`${aStyle.container} ${aStyle.mb3}`}>
      SIDEBAR
    </div>
    <div className={aStyle.listGroup}>
      <a className={`${aStyle.listGroupItem} ${aStyle.listGroupItemAction}`} href="/">
        <span>Sign up</span>
      </a>
      <a className={`${aStyle.listGroupItem} ${aStyle.listGroupItemAction}`} href="/">
        <span>Sign in</span>
      </a>
    </div>
  </div>
);

export default Sidebar;
