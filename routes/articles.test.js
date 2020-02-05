const request = require('supertest');
const createApp = require('../app');

describe('/v1/articles', () => {
  const mockDatabase = {
    models: {
      Article: {
        create: jest.fn()
      },
      User: {
        exists: jest.fn()
      }
    }
  };
  const { Article, User } = mockDatabase.models;
  const config = { token: 'my-token', database: mockDatabase };
  const app = createApp(config);

  describe('POST /', () => {
    test('should send an error if payload is invalid', async () => {
      return request(app)
        .post('/v1/articles')
        .send({ tags: [1] })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${config.token}`)
        .expect('Content-Type', /application\/json/)
        .expect(400, {
          status: 400,
          name: 'BadRequestError',
          message: 'Invalid request',
          detail: {
            body: {
              userId: 'is required',
              title: 'is required',
              text: 'is required',
              tags: ['must be a string']
            }
          }
        });
    });
  });

  test('should send an error if userId does not correspond to an existing user', async () => {
    const body = {
      userId: '5c0a7922c9d89830f4911426',
      title: 'Title',
      text: 'random text',
      tags: ['cars', 'technology']
    };

    User.exists.mockResolvedValueOnce(false);

    await request(app)
      .post('/v1/articles')
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${config.token}`)
      .expect(400, {
        status: 400,
        name: 'BadRequestError',
        message: 'Not found user with id: 5c0a7922c9d89830f4911426'
      });

    expect(Article.create).not.toHaveBeenCalledWith(body);
  });

  test('should send the new created article if payload is valid', async () => {
    const body = {
      userId: '5c0a7922c9d89830f4911426',
      title: 'Title',
      text: 'random text',
      tags: ['cars', 'technology']
    };
    const newArticle = {
      _id: '',
      ...body
    };

    Article.create.mockResolvedValueOnce({ toObject: () => newArticle });
    User.exists.mockResolvedValueOnce(true);

    const res = await request(app)
      .post('/v1/articles')
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${config.token}`);

    expect(Article.create).toHaveBeenCalledWith(body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(newArticle);
  });
});
