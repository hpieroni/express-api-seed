const { ApiError, ERRORS } = require('../../src/utils/errors');
const authentication = require('../../src/middlewares/authentication');

describe('Authentication middleware', () => {
  let auth;
  let req;
  let next;

  beforeEach(() => {
    auth = authentication('validToken');
    req = {
      headers: {},
    };
    next = jest.fn();
  });

  test('should throw an error if no authorization header is provided', () => {
    expect(() => auth(req, {}, next)).toThrow(new ApiError(ERRORS.MISSING_AUTH_HEADER));
    expect(next).not.toHaveBeenCalled();
  });

  test('should throw an error if the authorization schema is invalid', () => {
    req.headers.authorization = 'InvalidShema 123123';
    expect(() => auth(req, {}, next)).toThrow(new ApiError(ERRORS.INVALID_AUTH_SCHEMA));
    expect(next).not.toHaveBeenCalled();
  });

  test('should throw an error if token is invalid', () => {
    req.headers.authorization = 'Bearer invalidToken';
    expect(() => auth(req, {}, next)).toThrow(new ApiError(ERRORS.INVALID_AUTH_TOKEN));
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next middleware if auth is successfull ', () => {
    req.headers.authorization = 'Bearer validToken';
    auth(req, {}, next);
    expect(next).toHaveBeenCalled();
  });
});
