import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import TeacherAppointments from '../../../containers/Appointment/TeacherAppointments';
import generateStore from '../../../redux/store';
import findByTestAttribute from '../../../helpers/utils';
import {
  SIGN_IN_REQUEST, GET_MY_PROFILE, GET_TEACHER_APPOINTMENTS_LIST,
  GET_TEACHER_INFO,
} from '../../../redux/actions/types';

configure({
  adapter: new Adapter(),
});

const setUp = testStore => mount(
  <BrowserRouter>
    <Provider store={testStore}>
      <TeacherAppointments />
    </Provider>
  </BrowserRouter>,
);

describe('Tests for Teacher Appointments component', () => {
  let teacherAppointmentsComponent;
  let teacherIncomingAppointmentsNode;
  let teacherPastAppointmentsNode;

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
    const actionGetTeacherInfo = {
      type: GET_TEACHER_INFO,
      payload: {
        teacher: {
          id: 1,
          fullname: 'Ludwig von Bertalanfy',
          email: 'ludwig@xmail.com',
          photo: null,
          description: 'Math Models, Statistics, etc.',
          course: 'Dynamic Systems',
        },
      },
    };
    const actionGetTeacherAppointmentsList = {
      type: GET_TEACHER_APPOINTMENTS_LIST,
      payload: {
        appointments: [
          {
            id: 1,
            scheduled_for: '2020-12-23T04:10:27.545Z',
            user_fullname: 'Ludwig von Bertalanfy',
            user_email: 'ludwig@systems.xyz',
            status: 1,
          },
          {
            id: 2,
            scheduled_for: '2020-12-25T04:10:27.545Z',
            user_fullname: 'Bill Gates',
            user_email: 'bill@microsoft.xyz',
            status: 0,
          },
        ],
      },
    };

    testStore.dispatch(actionSignInRequest);
    testStore.dispatch(actionGetMyProfile);
    testStore.dispatch(actionGetTeacherInfo);
    testStore.dispatch(actionGetTeacherAppointmentsList);

    teacherAppointmentsComponent = setUp(testStore);
    teacherIncomingAppointmentsNode = findByTestAttribute(teacherAppointmentsComponent, 'teacherIncomingAppointments');
    teacherPastAppointmentsNode = findByTestAttribute(teacherAppointmentsComponent, 'teacherPastAppointments');
  });

  test('TeacherAppointments must have 2 children in this test.', () => {
    expect(teacherPastAppointmentsNode.find('tbody').find('tr').length
      + teacherIncomingAppointmentsNode.find('tbody').find('tr').length).toBe(2);
  });
});
