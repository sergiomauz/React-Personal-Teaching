import generateStore from '../../../redux/store';
import PersonalTeaching from '../../../apis/PersonalTeaching';

import {
  getUserAppointmentsList, getTeacherAppointmentsList,
  addAppointment, removeAppointment,
} from '../../../redux/actions/appointments.actions';

const userAdmin = {
  grant_type: 'password',
  username: 'sergio',
  password: '123456',
};
const userNotAdmin = {
  grant_type: 'password',
  username: 'sheyla',
  password: '123456',
};

describe('Tests for Users actions', () => {
  let personalTeaching;
  let adminSessionObject;
  let notAdminSessionObject;
  let store;

  //
  beforeAll(async done => {
    personalTeaching = PersonalTeaching();
    adminSessionObject = await personalTeaching.signInRequest(userAdmin);
    notAdminSessionObject = await personalTeaching.signInRequest(userNotAdmin);
    done();
  });
  beforeEach(() => {
    store = generateStore();
  });

  //
  test('Test -addAppointment- with the first Teacher (ID = 1) using a normal user ', async done => {
    const todayDate = new Date();
    const appointmentDate = new Date(todayDate.setDate(todayDate.getDate() + 3));
    const dd = String(appointmentDate.getDate()).padStart(2, '0');
    const mm = String(appointmentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = appointmentDate.getFullYear();
    const newAppointment = {
      teacher_id: 1,
      scheduled_for: `${yyyy}-${mm}-${dd} 08:00`,
    };

    return store.dispatch(addAppointment(newAppointment, notAdminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.appointments.list[0]).toHaveProperty('scheduled_for');
        done();
      });
  });

  test('Test -getUserAppointmentsList-', async done => {
    const request = await PersonalTeaching(notAdminSessionObject).getUserAppointmentsList();
    return store.dispatch(getUserAppointmentsList(notAdminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.appointments.list).toEqual(request.appointments);
        done();
      });
  });

  test('Test -getTeacherAppointmentsList- wtih the first Teacher (ID = 1)', async done => {
    const request = await PersonalTeaching(adminSessionObject).getTeacherAppointmentsList(1);
    return store.dispatch(getTeacherAppointmentsList(1, adminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.appointments.list).toEqual(request.appointments);
        done();
      });
  });

  test('Test -removeAppointment-', async done => {
    const request = await PersonalTeaching(notAdminSessionObject).getLastAppointment();
    return store.dispatch(getUserAppointmentsList(notAdminSessionObject))
      .then(() => store.dispatch(removeAppointment(request.appointment.id, notAdminSessionObject))
        .then(() => {
          const newState = store.getState();
          expect(newState.appointments.list
            .filter(item => item.id === request.appointment.id).length)
            .toBe(0);

          done();
        }));
  });
});