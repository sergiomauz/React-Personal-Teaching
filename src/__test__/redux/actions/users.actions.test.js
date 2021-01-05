import generateStore from '../../../redux/store';
import PersonalTeaching from '../../../apis/PersonalTeaching';

import {
  signInRequest, signOutRequest, getSession,
  getUsersList, getUserInfo, getMyProfile,
  addUser, updateUser, removeUser,
} from '../../../redux/actions/users.actions';

import server from '../../../apis/mocks/PersonalTeaching.Success';

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
const newUser = {
  fullname: 'Hulk Hogan',
  email: 'hulk@xmail.com',
  username: 'hulk',
  password: '123456',
};

jest.setTimeout(30000);

describe('Tests for Users actions', () => {
  let personalTeaching;
  let adminSessionObject;
  let notAdminSessionObject;
  let store;

  //
  beforeAll(() => server.listen());
  beforeEach(() => {
    store = generateStore();
  });
  beforeAll(async done => {
    personalTeaching = PersonalTeaching();
    adminSessionObject = await personalTeaching.signInRequest(userAdmin);
    notAdminSessionObject = await personalTeaching.signInRequest(userNotAdmin);
    done();
  });

  //
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  //
  test('Test -signInRequest-', () => store.dispatch(signInRequest(userNotAdmin))
    .then(() => {
      const newState = store.getState();
      expect(newState.users.myProfile.signedIn).toEqual(true);
    }));

  test('Test -signOutRequest-', () => {
    let newState;
    return store.dispatch(signInRequest(userNotAdmin)).then(() => {
      newState = store.getState();
      expect(newState.users.myProfile.signedIn).toBe(true);

      store.dispatch(signOutRequest());
      newState = store.getState();
      expect(newState.users.myProfile.signedIn).toBe(false);
    });
  });

  test('Test -getSession-', () => {
    const request = PersonalTeaching(notAdminSessionObject).getSession();
    store.dispatch(getSession(notAdminSessionObject));
    const newState = store.getState();
    expect(newState.users.myProfile.signedIn).toBe(request.signedIn);
  });

  test('Test -getUsersList-', async done => {
    const request = await PersonalTeaching(adminSessionObject).getUsersList();
    return store.dispatch(getUsersList(adminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.users.list).toEqual(request.users);
        done();
      });
  });

  test('Test -getUserInfo- to get the first User by ID = 1', async done => {
    const request = await PersonalTeaching(adminSessionObject).getUserInfo(1);
    return store.dispatch(getUserInfo(1, adminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.users.list).toContainEqual(request.user);
        done();
      });
  });

  test('Test -getMyProfile- without previous Sign In', async done => {
    const request = await PersonalTeaching(notAdminSessionObject).getMyProfile();
    return store.dispatch(getMyProfile(notAdminSessionObject))
      .then(() => {
        const newState = store.getState();
        expect(newState.users.myProfile).toEqual({ ...request.myprofile, signedIn: false });
        done();
      });
  });

  test('Test -addUser-', () => {
    let newState;
    return store.dispatch(addUser(newUser))
      .then(() => {
        newState = store.getState();
        expect(newState.users.list).toEqual([]);
      });
  });

  test('Test -updateUser-', async done => {
    const request = await PersonalTeaching(adminSessionObject).getLastUser();
    request.user.fullname = 'The Incredible Hulk';
    return store.dispatch(getUsersList(adminSessionObject))
      .then(() => store.dispatch(updateUser(request.user.id, request.user, adminSessionObject))
        .then(() => {
          const newState = store.getState();
          expect(newState.users.list).toContainEqual(request.user);
          done();
        }));
  });

  test('Test -removeUser-', async done => {
    const request = await PersonalTeaching(adminSessionObject).getLastUser();
    return store.dispatch(getUsersList(adminSessionObject))
      .then(() => store.dispatch(removeUser(request.user.id, adminSessionObject))
        .then(() => {
          const newState = store.getState();
          expect(newState.users.list).not.toContainEqual(request.user);
          done();
        }));
  });
});
