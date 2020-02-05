const { Unauthorized } = require('http-errors');

/**
 * @param {string} validToken valid token that middleware will use to check if request is authenticated
 * @returns {Function} authentication middleware
 */
const authentication = validToken =>
  /**
   * Authentication middleware
   * Validates the presence of a valid token in Authorization header
   *
   * @param {Object} req Express req object
   * @param {Object} res Express res object
   * @param {Function} next function
   *
   * @throws { Unauthorized } 401 HTTP Unauthorized error
   */
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Unauthorized('Missing authorization header');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new Unauthorized('Invalid authorization schema');
    }

    const [, token] = authHeader.split(' ');

    if (token !== validToken) {
      throw new Unauthorized('Invalid token');
    }

    next();
  };

module.exports = authentication;
