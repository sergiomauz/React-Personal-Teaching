import generateStore from '../../../redux/store';
import PersonalTeaching from '../../../apis/PersonalTeaching';

import {
  getTeachersList, getTeacherInfo,
  getTeacherAvailability, clearTeacherAvailability,
  addTeacher, updateTeacher, removeTeacher,
} from '../../../redux/actions/teachers.actions';

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
const newTeacher = {
  fullname: 'Myke deGrasse Tyson',
  email: 'myke@xmail.com',
  course: 'Physics',
  description: 'Black holes',
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
  test('Test -getTeachersList-', async done => {
    const request = await PersonalTeaching(notAdminSessionObject).getTeachersList();
    return store.dispatch(getTeachersList(notAdminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.teachers.list).toEqual(request.teachers);
        done();
      });
  });

  test('Test -getTeacherInfo- to get the first Teacher by ID = 1', async done => {
    const request = await PersonalTeaching(adminSessionObject).getTeacherInfo(1);
    return store.dispatch(getTeacherInfo(1, adminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.teachers.list).toContainEqual(request.teacher);
        done();
      });
  });

  test('Test -getTeacherAvailability- for the first Teacher by ID = 1', async done => {
    const todayDate = new Date();
    const appointmentDate = new Date(todayDate.setDate(todayDate.getDate() + 3));
    const dd = String(appointmentDate.getDate()).padStart(2, '0');
    const mm = String(appointmentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = appointmentDate.getFullYear();

    const request = await PersonalTeaching(notAdminSessionObject).getTeacherAvailability(1, `${yyyy}-${mm}-${dd}`);
    return store.dispatch(getTeacherInfo(1, adminSessionObject))
      .then(() => store.dispatch(getTeacherAvailability(1, `${yyyy}-${mm}-${dd}`, notAdminSessionObject))
        .then(() => {
          const newState = store.getState();
          expect(newState.teachers.list[0].availability).toEqual(request.teacher.availability);
          done();
        }));
  });

  test('Test -clearTeacherAvailability- for the first Teacher by ID = 1', async done => {
    const todayDate = new Date();
    const appointmentDate = new Date(todayDate.setDate(todayDate.getDate() + 3));
    const dd = String(appointmentDate.getDate()).padStart(2, '0');
    const mm = String(appointmentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = appointmentDate.getFullYear();

    const request = await PersonalTeaching(notAdminSessionObject).getTeacherAvailability(1, `${yyyy}-${mm}-${dd}`);
    return store.dispatch(getTeacherInfo(1, adminSessionObject))
      .then(() => store.dispatch(getTeacherAvailability(1, `${yyyy}-${mm}-${dd}`, notAdminSessionObject))
        .then(() => {
          let newState = store.getState();
          expect(newState.teachers.list[0].availability).toEqual(request.teacher.availability);

          store.dispatch(clearTeacherAvailability());
          newState = store.getState();
          expect(newState.teachers.list[0]).not.toHaveProperty('availability');
          done();
        }));
  });

  test('Test -addTeacher-', () => {
    let newState;
    return store.dispatch(addTeacher(newTeacher, adminSessionObject))
      .then(() => {
        newState = store.getState();
        expect(newState.teachers.list[0]).toMatchObject(newTeacher);
      });
  });

  test('Test -updateTeacher-', async done => {
    const request = await PersonalTeaching(adminSessionObject).getLastTeacher();
    request.teacher.fullname = 'Neil deGrasse Tyson';
    return store.dispatch(getTeachersList(adminSessionObject))
      .then(() => store.dispatch(
        updateTeacher(request.teacher.id,
          request.teacher,
          adminSessionObject),
      ).then(() => {
        const newState = store.getState();
        expect(newState.teachers.list).toContainEqual(request.teacher);
        done();
      }));
  });

  test('Test -removeTeacher-', async done => {
    const request = await PersonalTeaching(adminSessionObject).getLastTeacher();
    return store.dispatch(getTeachersList(adminSessionObject))
      .then(() => store.dispatch(removeTeacher(request.teacher.id, adminSessionObject))
        .then(() => {
          const newState = store.getState();
          expect(newState.teachers.list).not.toContainEqual(request.teacher);
          done();
        }));
  });
});
