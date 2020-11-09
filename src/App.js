import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import generateStore from './redux/store';

const App = () => {
  const store = generateStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
