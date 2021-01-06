/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  BACKEND_PERSONAL_TEACHING,
} from '../../helpers/constants';

const handlers = [
  rest.post(`${BACKEND_PERSONAL_TEACHING}oauth/token`, (req, res, ctx) => {
    const {
      grant_type, username, password,
    } = req.body;

    const successResponse = {
      access_token: 'IW8jubprAKy-FC0CeYwJKkgqEXb7KZn2q_gTzK12ubs',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'Q9xQYwxQI7wWlvix5pAz0mlyFdnGKEDWXua2CRmieRA',
      created_at: Math.abs(new Date()),
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),

  rest.get(`${BACKEND_PERSONAL_TEACHING}users/myappointments`, (req, res, ctx) => {
    const successResponse = {
      appointments: [
        {
          id: 1,
          scheduled_for: '2020-12-31 08:00',
          teacher_fullname: 'Son Goku',
          course: 'How to master Ultra Instinct?',
          status: 0,
        },
        {
          id: 2,
          scheduled_for: '2020-12-31 09:00',
          teacher_fullname: 'Saitama Sensei',
          course: 'How to beat your enemies with one punch?',
          status: 0,
        },
      ],
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.get(`${BACKEND_PERSONAL_TEACHING}teachers/:teacherId/appointments`, (req, res, ctx) => {
    const { teacherId } = req.params;
    const successResponse = {
      appointments: [
        {
          id: 1,
          scheduled_for: '2020-12-31 08:00',
          user_fullname: 'Neil deGrasse Tyson',
          user_email: 'neil@xmail.com',
          status: 0,
        },
        {
          id: 2,
          scheduled_for: '2020-12-31 09:00',
          user_fullname: 'Sergio Zambrano',
          user_email: 'sergio@xmail.com',
          status: 0,
        },
      ],
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.get(`${BACKEND_PERSONAL_TEACHING}appointments/last`, (req, res, ctx) => {
    const successResponse = {
      appointment: {
        id: 1,
        user_id: 1,
        teacher_id: 1,
        scheduled_for: '2020-12-31 08:00',
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.delete(`${BACKEND_PERSONAL_TEACHING}appointments/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const successResponse = {
      appointment: {
        id: parseInt(id, 10),
        user_id: 1,
        teacher_id: 1,
        scheduled_for: '2020-12-31 08:00',
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.post(`${BACKEND_PERSONAL_TEACHING}appointments`, (req, res, ctx) => {
    const {
      teacher_id, scheduled_for,
    } = req.body;

    const successResponse = {
      appointment: {
        id: 1,
        user_id: 1,
        teacher_id: parseInt(teacher_id, 10),
        scheduled_for,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),

  rest.get(`${BACKEND_PERSONAL_TEACHING}users`, (req, res, ctx) => {
    const successResponse = {
      users: [
        {
          id: 1,
          fullname: 'Sergio Zambrano',
          username: 'sergiomauz',
          email: 'sergio@xmail.com',
          admin: true,
        },
        {
          id: 2,
          fullname: 'Sheyla Pozo',
          username: 'sheyla',
          email: 'sheyla@xmail.com',
          admin: false,
        },
      ],
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.get(`${BACKEND_PERSONAL_TEACHING}users/last`, (req, res, ctx) => {
    const successResponse = {
      user: {
        id: 1,
        fullname: 'Sergio Zambrano',
        username: 'sergiomauz',
        email: 'sergio@xmail.com',
        admin: false,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.get(`${BACKEND_PERSONAL_TEACHING}users/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const successResponse = {
      user: {
        id: 1,
        fullname: 'Sergio Zambrano',
        username: 'sergiomauz',
        email: 'sergio@xmail.com',
        admin: false,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.post(`${BACKEND_PERSONAL_TEACHING}users`, (req, res, ctx) => {
    const {
      fullname, email, username, password,
    } = req.body;

    const successResponse = {
      user: {
        id: 1,
        fullname,
        username,
        email,
        admin: false,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.put(`${BACKEND_PERSONAL_TEACHING}users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const {
      fullname, email, username, password,
    } = req.body;

    const successResponse = {
      user: {
        id: parseInt(id, 10),
        fullname,
        username,
        email,
        admin: false,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.delete(`${BACKEND_PERSONAL_TEACHING}users/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const successResponse = {
      user: {
        id: 1,
        fullname: 'Sergio Zambrano',
        username: 'sergiomauz',
        email: 'sergio@xmail.com',
        admin: false,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),

  rest.get(`${BACKEND_PERSONAL_TEACHING}teachers`, (req, res, ctx) => {
    const successResponse = {
      teachers: [
        {
          id: 1,
          fullname: 'Sergio Zambrano',
          email: 'sergio@xmail.com',
          photo: 'https://domain.xyz/photo.jpg',
          course: 'Math rocks',
          description: 'The hardest maths in the world',
        },
        {
          id: 2,
          fullname: 'Sheyla Pozo',
          email: 'sheyla@xmail.com',
          photo: 'https://domain.xyz/photo.jpg',
          course: 'English Grammar',
          description: 'Grammar for kids',
        },
      ],
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.get(`${BACKEND_PERSONAL_TEACHING}teachers/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const successResponse = {
      teacher: {
        id: 1,
        fullname: 'Sergio Zambrano',
        email: 'sergio@xmail.com',
        photo: 'https://domain.xyz/photo.jpg',
        course: 'Math rocks',
        description: 'The hardest maths in the world',
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.get(`${BACKEND_PERSONAL_TEACHING}teachers/:id/availability/:date`, (req, res, ctx) => {
    const { id, date } = req.params;

    const successResponse = {
      teacher: {
        id: parseInt(id, 10),
        availability: [8, 9, 10, 11, 12, 15, 16, 17],
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.delete(`${BACKEND_PERSONAL_TEACHING}teachers/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const successResponse = {
      teacher: {
        id: 1,
        fullname: 'Sergio Zambrano',
        email: 'sergio@xmail.com',
        photo: 'https://domain.xyz/photo.jpg',
        course: 'Math rocks',
        description: 'The hardest maths in the world',
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.post(`${BACKEND_PERSONAL_TEACHING}teachers`, (req, res, ctx) => {
    const {
      fullname, email, photo, course, description,
    } = req.body;

    const successResponse = {
      teacher: {
        id: 1,
        fullname,
        email,
        photo,
        course,
        description,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
  rest.put(`${BACKEND_PERSONAL_TEACHING}teachers/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const {
      fullname, email, photo, course, description,
    } = req.body;

    const successResponse = {
      teacher: {
        id: parseInt(id, 10),
        fullname,
        email,
        photo,
        course,
        description,
      },
    };
    return res(ctx.status(200), ctx.json(successResponse));
  }),
];

const server = setupServer(...handlers);

export default server;
