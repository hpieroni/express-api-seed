const request = require('supertest');
const { ERRORS } = require('../src/utils/errors');
const createApp = require('../src/app');

describe('App', () => {
  const config = { token: 'my-token' };
  const app = createApp(config);

  test('should return 401 if no authorization is provided', async () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(401, ERRORS.MISSING_AUTH_HEADER);
  });

  test('should return 401 if invalid token is provided', async () => {
    return request(app)
      .get('/')
      .set('Authorization', 'Bearer invalidToken')
      .expect(401, ERRORS.INVALID_AUTH_TOKEN);
  });

  test('should reply if valid authorization is provided', async () => {
    return request(app)
      .get('/')
      .set('Authorization', `Bearer ${config.token}`)
      .expect(200, { message: 'server is up and running!' });
  });

  test('should send 404 when an invalid resource is requested', async () => {
    return request(app)
      .get('/invalid')
      .set('Authorization', `Bearer ${config.token}`)
      .expect(404, ERRORS.NOT_FOUND);
  });
});
