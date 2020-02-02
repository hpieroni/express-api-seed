const request = require('supertest');
const { createApp } = require('./app');

describe('API app', () => {
  const config = { token: 'my-token' };
  const app = createApp(config);

  test('should return 401 if no authorization is provided', async () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(401, {
        status: 401,
        name: 'UnauthorizedError',
        message: 'Missing authorization header'
      });
  });

  test('All routes should be authenticated', async () => {
    return request(app)
      .get('/')
      .set('Authorization', `Bearer ${config.token}`)
      .expect(200, { message: 'server is up and running!' });
  });
});
