const { HttpError } = require('http-errors');

/**
 * Global Error Handler middleware
 *
 * @param {*} error received error
 * @param {*} req req object
 * @param {*} res res object
 * @param {*} next next function
 *
 * @returns {*} res object
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    const { status, name, message } = error;
    return res.status(status).json({
      status,
      name,
      message
    });
  }

  // Default to 500 error
  return res.status(500).json({
    status: 500,
    name: 'InternalServerError',
    message: error.message || 'Unexpected error'
  });
}

module.exports = errorHandler;
