const { HttpError } = require('http-errors');

/**
 * Global Error Handler middleware
 *
 * @param {*} error received error
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 * @param {Function} next next function
 *
 * @returns {Object} Express res object
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    const { status, name, message, detail } = error;
    return res.status(status).json({
      status,
      name,
      message,
      detail
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
