import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppCrashedError from './components/AppCrashedError';
import PageContainer from './components/PageContainer';
import generateStore from './redux/store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = generateStore();
  }

  render() {
    return (
      <AppCrashedError>
        <Provider store={this.store}>
          <BrowserRouter>
            <PageContainer />
          </BrowserRouter>
        </Provider>
      </AppCrashedError>
    );
  }
}

export default App;
