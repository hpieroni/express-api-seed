const { BadRequest } = require('http-errors');
const errorHandler = require('./error-handler');

describe('Error handler middleware', () => {
  const req = {};
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('on errors created with `http-errors` module', () => {
    test('should format its data as json', () => {
      const error = new BadRequest('error message');

      errorHandler(error, req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        name: 'BadRequestError',
        message: 'error message'
      });
    });
  });

  describe('on unexpected errors', () => {
    test('should return a 500 error with default message if not present', () => {
      const error = new Error();

      errorHandler(error, req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        name: 'InternalServerError',
        message: 'Unexpected error'
      });
    });

    test('should return a 500 error with given message', () => {
      const error = new Error('custom message');

      errorHandler(error, req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        name: 'InternalServerError',
        message: 'custom message'
      });
    });
  });
});
