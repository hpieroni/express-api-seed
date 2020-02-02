const request = require('supertest');
const createApp = require('./app');

describe('App', () => {
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

  test('should return 401 if invalid token is provided', async () => {
    return request(app)
      .get('/')
      .set('Authorization', 'Bearer invalidToken')
      .expect(401, {
        status: 401,
        name: 'UnauthorizedError',
        message: 'Invalid token'
      });
  });

  test('should reply if valid authorization is provided', async () => {
    return request(app)
      .get('/')
      .set('Authorization', `Bearer ${config.token}`)
      .expect(200, { message: 'server is up and running!' });
  });
});
