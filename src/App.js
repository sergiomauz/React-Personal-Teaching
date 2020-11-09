import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import generateStore from './redux/store';
import Sidebar from './components/Sidebar';
import PageContent from './components/PageContent';
import aStyle from './styles/index.module.css';

const App = () => {
  const store = generateStore();

  return (
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
};

export default App;
