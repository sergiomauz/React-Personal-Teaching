import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PageContainer from './components/PageContainer';
import generateStore from './redux/store';

const App = () => {
  const store = generateStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
