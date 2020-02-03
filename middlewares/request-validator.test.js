const Joi = require('@hapi/joi');
const createError = require('http-errors');
const requestValidator = require('./request-validator');

describe('Request validator middleware', () => {
  let validator;
  let next;

  beforeEach(() => {
    validator = requestValidator({
      body: Joi.object({
        name: Joi.string().required(),
        web: Joi.string()
          .required()
          .uri(),
        age: Joi.number()
      })
    });
    next = jest.fn();
  });

  test('should throw an error with explanatory detail for every field according to the schema', () => {
    const expectedError = createError(400, 'Invalid request', {
      detail: {
        body: {
          name: 'is required',
          web: 'must be a valid uri'
        }
      }
    });
    const req = {
      body: {
        web: 'invalidUri'
      }
    };

    try {
      validator(req, {}, next);
    } catch (e) {
      expect(e).toEqual(expectedError);
      expect(e.detail).toEqual(expectedError.detail);
      expect(next).not.toHaveBeenCalled();
    }
  });

  test('should call next when valuies are valid according to the schema', () => {
    const req = {
      body: {
        name: 'John Doe',
        web: 'http://johndoe.me'
      }
    };

    validator(req, {}, next);
    expect(next).toHaveBeenCalled();
  });
});
