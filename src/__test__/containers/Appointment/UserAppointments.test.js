import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import UserAppointments from '../../../containers/Appointment/UserAppointments';
import generateStore from '../../../redux/store';
import findByTestAttribute from '../../../helpers/utils';
import {
  SIGN_IN_REQUEST, GET_MY_PROFILE, GET_USER_APPOINTMENTS_LIST,
} from '../../../redux/actions/types';

configure({
  adapter: new Adapter(),
});

const setUp = testStore => mount(
  <BrowserRouter>
    <Provider store={testStore}>
      <UserAppointments />
    </Provider>
  </BrowserRouter>,
);

describe('Tests for User Appointments component', () => {
  let userAppointmentsComponent;
  let userIncomingAppointmentsNode;
  let userPastAppointmentsNode;

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
    const actionGetUserAppointmentsList = {
      type: GET_USER_APPOINTMENTS_LIST,
      payload: {
        appointments: [
          {
            id: 1,
            scheduled_for: '2020-12-23T04:10:27.545Z',
            teacher_fullname: 'Ludwig von Bertalanfy',
            course: 'Dynamic Systems',
            status: 1,
          },
          {
            id: 2,
            scheduled_for: '2020-12-25T04:10:27.545Z',
            teacher_fullname: 'Bill Gates',
            course: 'Computer Science',
            status: 0,
          },
        ],
      },
    };

    testStore.dispatch(actionSignInRequest);
    testStore.dispatch(actionGetMyProfile);
    testStore.dispatch(actionGetUserAppointmentsList);

    userAppointmentsComponent = setUp(testStore);
    userIncomingAppointmentsNode = findByTestAttribute(userAppointmentsComponent, 'userIncomingAppointments');
    userPastAppointmentsNode = findByTestAttribute(userAppointmentsComponent, 'userPastAppointments');
  });

  test('UserAppointments must have 2 children in this test.', () => {
    expect(userPastAppointmentsNode.find('tbody').find('tr').length
      + userIncomingAppointmentsNode.find('tbody').find('tr').length).toBe(2);
  });
});
