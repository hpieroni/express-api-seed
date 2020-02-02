const { Unauthorized } = require('http-errors');

/**
 * Authentication middleware
 * Validates the presence of a valid token in Authorization header
 *
 * @param {*} req req object
 * @param {*} res res object
 * @param {*} next next function
 *
 * @throws { Unauthorized } 401 HTTP Unauthorized error
 */
const authentication = validToken => (req, res, next) => {
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
