import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import generateStore from '../../redux/store';
import findByTestAttribute from '../../helpers/utils';
import {
  SIGN_IN_REQUEST, GET_MY_PROFILE,
} from '../../redux/actions/types';

configure({
  adapter: new Adapter(),
});

const setUp = testStore => mount(
  <BrowserRouter>
    <Provider store={testStore}>
      <Sidebar />
    </Provider>
  </BrowserRouter>,
);

describe('Tests for Sidebar component - not Signed In User', () => {
  let sidebarComponent;
  let sidebarMenuNode;

  beforeAll(() => {
    const testStore = generateStore();

    sidebarComponent = setUp(testStore);
    sidebarMenuNode = findByTestAttribute(sidebarComponent, 'sidebarMenu');
  });

  test('Sidebar must have 2 children', () => {
    expect(sidebarMenuNode.find('li').length).toBe(2);
  });

  test('First child is an <a> tag with "Sign In" text', () => {
    expect(sidebarMenuNode.childAt(0).text()).toBe('Sign In');
  });

  test('Second child is an <a> tag with "Sign Up" text', () => {
    expect(sidebarMenuNode.childAt(1).text()).toBe('Sign Up');
  });
});

describe('Tests for Sidebar component - Signed In User', () => {
  let sidebarComponent;
  let sidebarMenuNode;

  beforeAll(() => {
    const testStore = generateStore();
    const actionSignInRequest = {
      type: SIGN_IN_REQUEST,
      payload: {
        signedIn: true,
      },
    };
    testStore.dispatch(actionSignInRequest);

    sidebarComponent = setUp(testStore);
    sidebarMenuNode = findByTestAttribute(sidebarComponent, 'sidebarMenu');
  });

  test('Sidebar must have 3 children if it is Signed In without a profile', () => {
    expect(sidebarMenuNode.find('li').length).toBe(3);
  });

  test('First child is an <a> tag with "Teachers" text', () => {
    expect(sidebarMenuNode.childAt(0).text()).toBe('Teachers');
  });

  test('Second child is an <a> tag with "My appointments" text', () => {
    expect(sidebarMenuNode.childAt(1).text()).toBe('My appointments');
  });

  test('First child is an <a> tag with "Sign out" text', () => {
    expect(sidebarMenuNode.childAt(2).text()).toBe('Sign out');
  });
});

describe('Tests for Sidebar component - Signed In User with admin profile', () => {
  let sidebarComponent;
  let sidebarMenuNode;
  let sidebarUsernameNode;

  beforeAll(() => {
    const testStore = generateStore();
    const actionSignInRequest = {
      type: SIGN_IN_REQUEST,
      payload: {
        signedIn: true,
      },
    };
    const actionGetMyProfile = {
      type: GET_MY_PROFILE,
      payload: {
        myprofile: {
          id: 1,
          fullname: 'Sergio Zambrano',
          username: 'sergio',
          email: 'sergio@xmail.com',
          admin: true,
        },
      },
    };
    testStore.dispatch(actionSignInRequest);
    testStore.dispatch(actionGetMyProfile);

    sidebarComponent = setUp(testStore);
    sidebarUsernameNode = findByTestAttribute(sidebarComponent, 'sidebarUsername');
    sidebarMenuNode = findByTestAttribute(sidebarComponent, 'sidebarMenu');
  });

  test('Sidebar has an <a> tag with the username', () => {
    expect(sidebarUsernameNode.find('a').text()).toBe('sergio');
  });

  test('Sidebar has a menu list, it must have 5 children if it is Signed In with an admin profile', () => {
    expect(sidebarMenuNode.find('li').length).toBe(5);
  });

  test('First child of Menu List is an <a> tag with "Teachers" text', () => {
    expect(sidebarMenuNode.childAt(0).text()).toBe('Teachers');
  });

  test('Second child of Menu List is an <a> tag with "Users" text', () => {
    expect(sidebarMenuNode.childAt(1).text()).toBe('Users');
  });

  test('Third child of Menu List is an <a> tag with "New Teacher" text', () => {
    expect(sidebarMenuNode.childAt(2).text()).toBe('New Teacher');
  });

  test('Fourth child of Menu List is an <a> tag with "My appointments" text', () => {
    expect(sidebarMenuNode.childAt(3).text()).toBe('My appointments');
  });

  test('Fifth child of Menu List is an <a> tag with "Sign out" text', () => {
    expect(sidebarMenuNode.childAt(4).text()).toBe('Sign out');
  });

  test('After click on "Sign Out", sidebar returns to first state with a 2 options menu.', () => {
    sidebarMenuNode.childAt(4).find('button').first().simulate('click');

    const newSidebarMenuNode = findByTestAttribute(sidebarComponent, 'sidebarMenu');
    expect(newSidebarMenuNode.find('li').length).toBe(2);
    expect(newSidebarMenuNode.childAt(0).text()).toBe('Sign In');
    expect(newSidebarMenuNode.childAt(1).text()).toBe('Sign Up');
  });
});
