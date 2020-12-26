const { ApiError, ERRORS } = require('../utils/errors');

/**
 * @param {string} validToken valid token that middleware will use to check if request is authenticated
 * @returns {Function} authentication middleware
 */
const authentication = (validToken) =>
  /**
   * Authentication middleware
   * Validates the presence of a valid token in Authorization header
   *
   * @param {Object} req Express req object
   * @param {Object} res Express res object
   * @param {Function} next function
   *
   * @throws {ApiError}
   */
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(ERRORS.MISSING_AUTH_HEADER);
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new ApiError(ERRORS.INVALID_AUTH_SCHEMA);
    }

    const [, token] = authHeader.split(' ');

    if (token !== validToken) {
      throw new ApiError(ERRORS.INVALID_AUTH_TOKEN);
    }

    next();
  };

module.exports = authentication;
