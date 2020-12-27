import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import React from 'react';
import App from '../App';
import generateStore from '../redux/store';
import findByTestAttribute from '../helpers/utils';
import {
  SIGN_IN_REQUEST, GET_SESSION, SIGN_OUT,
  GET_USERS_LIST, GET_USER_INFO, GET_MY_PROFILE,
  ADD_USER, UPDATE_USER, UPDATE_USER_N_REDIRECT, REMOVE_USER,
} from '../redux/actions/types';

configure({
  adapter: new Adapter(),
});

const setUp = (initialState = {}) => {
  const testStore = generateStore();
  testStore.dispatch(initialState);
  const wrapper = mount(<App store={testStore} />);
  setTimeout(5000);
  return wrapper;
};

describe('Tests for App component', () => {
  test('Test SIGN_IN_REQUEST', () => {
    const initialState = {
      type: SIGN_IN_REQUEST,
      payload: {
        signedIn: true,
      },
    };
    const appComponent = setUp(initialState);

    const x = findByTestAttribute(appComponent, 'sidebarMenu');
    expect(toJson(x)).toMatchSnapshot();
  });

  // let appComponent;
  // beforeEach(() => {
  //   appComponent = setUp();
  // });
});
