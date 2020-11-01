import React from 'react';
import Sidebar from './components/Sidebar';
import PageContent from './components/PageContent';
import Style from './styles/index.module.css';

const App = () => (
  <div className={Style.dFlexWrapper}>
    <Sidebar />
    <PageContent />
  </div>
);

export default App;
