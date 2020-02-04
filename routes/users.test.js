const request = require('supertest');
const createApp = require('../app');

describe('/v1/users', () => {
  const config = { token: 'my-token' };
  const app = createApp(config);

  describe('POST /', () => {
    test('should send 400 if payload is invalid', async () => {
      return request(app)
        .post('/v1/users')
        .send({ name: 'john' })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${config.token}`)
        .expect('Content-Type', /application\/json/)
        .expect(400, {
          status: 400,
          name: 'BadRequestError',
          message: 'Invalid request',
          detail: {
            body: {
              avatar: 'is required'
            }
          }
        });
    });
  });

  test('should send the new created user if payload is valid', async () => {
    const body = { name: 'john', avatar: 'http://john.com/avatar' };

    const res = await request(app)
      .post('/v1/users')
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${config.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ _id: expect.any(String), ...body });
  });
});
