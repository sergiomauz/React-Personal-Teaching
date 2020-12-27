/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageContainer from './components/PageContainer';

const App = props => {
  const { store } = props;

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PageContainer />
      </Provider>
    </BrowserRouter>
  );
};

App.propTypes = {
  store: PropTypes.any.isRequired,
};

export default App;
