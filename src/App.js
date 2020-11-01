import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import PageContent from './components/PageContent';

import aStyle from './styles/index.module.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <>
        <div className={aStyle.dFlexWrapper}>
          <Sidebar />
          <PageContent />
        </div>
      </>
    </BrowserRouter>
  </Provider>
);

export default App;
