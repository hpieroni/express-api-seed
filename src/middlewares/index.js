const authentication = require('./authentication');
const errorHandler = require('./error-handler');
const notFound = require('./not-found');
const requestValidator = require('./request-validator');

module.exports = {
  authentication,
  errorHandler,
  notFound,
  requestValidator,
};
