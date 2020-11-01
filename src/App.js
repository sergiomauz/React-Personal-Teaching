import React from 'react';
import './styles/index.min.css';
import './styles/sidebar.css';

const App = () => (
  <div className="d-flex wrapper">
    <div className="sidebar-wrapper border-right">
      <div className="sidebar-heading d-flex justify-content-center">
        <img className="sidebar-user-avatar" src="" alt="" />
      </div>
      <div className="container mb-3">
        SIDEBAR
      </div>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action bg-sidebar-item text-white" href="/users/new">
          <i className="fas fa-user-plus" />
          <span> Sign up</span>
        </a>
        <a className="list-group-item list-group-item-action bg-sidebar-item text-white" href="/">
          <i className="fas fa-sign-in-alt" />
          <span> Sign in</span>
        </a>
      </div>
    </div>

    <div className="page-content-wrapper">
      <nav className="navbar bg-3778c2 d-flex justify-content-between mb-3">
        <button className="btn bg-sidebar-item text-white" type="button" id="menu-toggle">
          <i className="fa fa-bars" aria-hidden="true" />
        </button>
        <h3 className="text-white text-uppercase m-0 title-font">SIGN IN</h3>
        <button className="btn bg-sidebar-item text-white" type="button">
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </nav>
      <div className="container-fluid">
        This HTML file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the body tag.

        To begin the development, run `npm start` or `yarn start`.
        To create a production bundle, use `npm run build` or `yarn build`.
      </div>
    </div>
  </div>
);

export default App;
