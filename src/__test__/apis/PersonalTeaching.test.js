import PersonalTeaching from '../../apis/PersonalTeaching';

// Global variables
const newValidUser1 = {
  fullname: 'Ariel Camus',
  email: 'ariel@camus.org',
  username: 'ariel',
  password: '123456',
};
const newValidTeacher1 = {
  fullname: 'Neil deGrasse Tyson',
  email: 'neil@xmail.com',
  course: 'Physics',
  description: 'Black holes.',
};
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

describe('Tests for Sign In method', () => {
  let personalTeaching;
  let adminSessionObject;
  let notAdminSessionObject;

  //
  beforeAll(async done => {
    personalTeaching = PersonalTeaching();
    adminSessionObject = await personalTeaching.signInRequest(userAdmin);
    notAdminSessionObject = await personalTeaching.signInRequest(userNotAdmin);
    done();
  });

  //
  test('Test Sign In for an user with admin privileges, has a signedIn property equals to True', () => expect(adminSessionObject)
    .toMatchObject({
      signedIn: true,
    }));

  test('Test Sign In for an user with admin privileges, has an accessToken property', () => expect(adminSessionObject)
    .toHaveProperty('accessToken'));

  test('Test Sign In for an user with admin privileges, has a refreshToken property', () => expect(adminSessionObject)
    .toHaveProperty('refreshToken'));

  test('Test Sign In for an user without admin privileges, has a signedIn property equals to True', () => expect(notAdminSessionObject)
    .toMatchObject({
      signedIn: true,
    }));

  test('Test Sign In for an user without admin privileges, has an accessToken property', () => expect(notAdminSessionObject)
    .toHaveProperty('accessToken'));

  test('Test Sign In for an user without admin privileges, has a refreshToken property', () => expect(notAdminSessionObject)
    .toHaveProperty('refreshToken'));
});

describe('Test methods for getting Cloudinary profile', () => {
  let adminSessionObject;
  let notAdminSessionObject;

  //
  beforeAll(async done => {
    adminSessionObject = await PersonalTeaching().signInRequest(userAdmin);
    notAdminSessionObject = await PersonalTeaching().signInRequest(userNotAdmin);
    done();
  });

  test('Test for getting pressets to use Cloudinary, using an user without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getCloudinaryPreset())
    .resolves
    .not.toHaveProperty('upload_preset'));

  test('Test for getting pressets to use Cloudinary, using an user with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getCloudinaryPreset())
    .resolves
    .toHaveProperty('upload_preset'));
});

describe('Test methods for adding User, Teacher and Appointment', () => {
  let adminSessionObject;
  let notAdminSessionObject;
  let lastTeacher;
  //
  beforeAll(async done => {
    adminSessionObject = await PersonalTeaching().signInRequest(userAdmin);
    notAdminSessionObject = await PersonalTeaching().signInRequest(userNotAdmin);

    lastTeacher = await PersonalTeaching(adminSessionObject).getLastTeacher();

    done();
  });

  test('Test for adding a new valid user', () => expect(PersonalTeaching()
    .addUser(newValidUser1))
    .resolves
    .toHaveProperty('user'));

  test('Test for adding a new valid user, but this username exists', () => expect(PersonalTeaching()
    .addUser(newValidUser1))
    .resolves
    .not.toHaveProperty('user'));

  test('Test for adding a new valid teacher using an user without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .addTeacher(newValidTeacher1))
    .resolves
    .not.toHaveProperty('teacher'));

  test('Test for adding a new valid teacher using an user with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .addTeacher(newValidTeacher1))
    .resolves
    .toHaveProperty('teacher'));

  test('Test for adding a new appointment with a common user and future date', () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return expect(PersonalTeaching(notAdminSessionObject)
      .addAppointment({
        teacher_id: lastTeacher.teacher.id,
        scheduled_for: `${yyyy + 1}-${mm}-${dd} 08:00`,
      }))
      .resolves
      .toHaveProperty('appointment');
  });

  test('Test for adding a new appointment with a common user and past date', () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return expect(PersonalTeaching(notAdminSessionObject)
      .addAppointment({
        teacher_id: lastTeacher.teacher.id,
        scheduled_for: `${yyyy - 1}-${mm}-${dd} 08:00`,
      }))
      .resolves
      .not.toHaveProperty('appointment');
  });
});

describe('Test methods for listing and showing data about Users, Teachers and Appointments', () => {
  let adminSessionObject;
  let notAdminSessionObject;

  //
  beforeAll(async done => {
    adminSessionObject = await PersonalTeaching().signInRequest(userAdmin);
    notAdminSessionObject = await PersonalTeaching().signInRequest(userNotAdmin);
    done();
  });

  test('Test for listing teachers using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getTeachersList())
    .resolves
    .toHaveProperty('teachers'));

  test('Test for listing teachers using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getTeachersList())
    .resolves
    .toHaveProperty('teachers'));

  test('Test for getting last teacher using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getLastTeacher())
    .resolves
    .toHaveProperty('teacher'));

  test('Test for getting last teacher using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getLastTeacher())
    .resolves
    .toHaveProperty('teacher'));

  test('Test for getting first teacher by ID using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getTeacherInfo(1))
    .resolves
    .toHaveProperty('teacher'));

  test('Test for getting first teacher by ID using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getTeacherInfo(1))
    .resolves
    .toHaveProperty('teacher'));

  test('Test for listing users using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getUsersList())
    .resolves
    .not.toHaveProperty('users'));

  test('Test for listing users using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getUsersList())
    .resolves
    .toHaveProperty('users'));

  test('Test for getting last user using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getLastUser())
    .resolves
    .not.toHaveProperty('user'));

  test('Test for getting last user using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getLastUser())
    .resolves
    .toHaveProperty('user'));

  test('Test for getting profile of current user using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getMyProfile())
    .resolves
    .toHaveProperty('myprofile'));

  test('Test for getting profile of current user using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getMyProfile())
    .resolves
    .toHaveProperty('myprofile'));

  test('Test for getting first user by ID using token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .getUserInfo(1))
    .resolves
    .not.toHaveProperty('user'));

  test('Test for getting first user by ID using token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .getUserInfo(1))
    .resolves
    .toHaveProperty('user'));
});

describe('Test methods for updating User, Teacher and Appointment', () => {
  let adminSessionObject;
  let notAdminSessionObject;
  let lastUser;
  let lastTeacher;

  //
  beforeAll(async done => {
    adminSessionObject = await PersonalTeaching().signInRequest(userAdmin);
    notAdminSessionObject = await PersonalTeaching().signInRequest(userNotAdmin);

    lastUser = await PersonalTeaching(adminSessionObject).getLastUser();
    lastTeacher = await PersonalTeaching(adminSessionObject).getLastTeacher();

    done();
  });

  test('Test for updating an user, with valid data, and using a token without permissions', () => {
    lastUser.user.fullname = 'Willow Matta';
    lastUser.user.email = 'willow@microverse.org';
    return expect(PersonalTeaching(notAdminSessionObject)
      .updateUser(lastUser.user.id, lastUser.user))
      .resolves
      .not.toHaveProperty('user');
  });

  test('Test for updating a teacher, with valid data, and using a token without permissions', () => {
    lastTeacher.teacher.fullname = 'Nail deGrasse Tayson';
    lastTeacher.teacher.email = 'neil@thebest.com';
    return expect(PersonalTeaching(notAdminSessionObject)
      .updateTeacher(lastTeacher.teacher.id, lastTeacher.teacher))
      .resolves
      .not.toHaveProperty('teacher');
  });

  test('Test for updating an user, with valid data, and using a token with permissions', () => {
    lastUser.user.fullname = 'Willow Matta';
    lastUser.user.email = 'willow@microverse.org';
    return expect(PersonalTeaching(adminSessionObject)
      .updateUser(lastUser.user.id, lastUser.user))
      .resolves
      .toHaveProperty('user');
  });

  test('Test for updating a teacher, with valid data, using a token with permissions', () => {
    lastTeacher.teacher.fullname = 'Nail deGrasse Tayson';
    lastTeacher.teacher.email = 'neil@thebest.com';
    return expect(PersonalTeaching(adminSessionObject)
      .updateTeacher(lastTeacher.teacher.id, lastTeacher.teacher))
      .resolves
      .toHaveProperty('teacher');
  });
});

describe('Test methods for removing User, Teacher and Appointment', () => {
  let adminSessionObject;
  let notAdminSessionObject;
  let lastUser;
  let lastTeacher;
  let lastAppointment;

  //
  beforeAll(async done => {
    adminSessionObject = await PersonalTeaching().signInRequest(userAdmin);
    notAdminSessionObject = await PersonalTeaching().signInRequest(userNotAdmin);

    lastUser = await PersonalTeaching(adminSessionObject).getLastUser();
    lastTeacher = await PersonalTeaching(adminSessionObject).getLastTeacher();
    lastAppointment = await PersonalTeaching(adminSessionObject).getLastAppointment();

    done();
  });

  test('Test for removing an user, using a token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .removeUser(lastUser.user.id))
    .resolves
    .not.toHaveProperty('user'));

  test('Test for removing a teacher, using a token without permissions', () => expect(PersonalTeaching(notAdminSessionObject)
    .removeTeacher(lastTeacher.teacher.id))
    .resolves
    .not.toHaveProperty('teacher'));

  test('Test for removing an user, using a token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .removeUser(lastUser.user.id))
    .resolves
    .toHaveProperty('user'));

  test('Test for removing a teacher, using a token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .removeTeacher(lastTeacher.teacher.id))
    .resolves
    .toHaveProperty('teacher'));

  test('Test for removing an appointment, using a token with permissions', () => expect(PersonalTeaching(adminSessionObject)
    .removeAppointment(lastAppointment.appointment.id))
    .resolves
    .toHaveProperty('appointment'));
});
