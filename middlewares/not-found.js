const { NotFound } = require('http-errors');

/**
 * Not found middleware
 * Place this middleware after all routes were defined and will send a 404 http error
 * to the next middleware.
 *
 * @param {*} req req object
 * @param {*} res res object
 * @param {*} next next function
 *
 * @throws { NotFound } 404 HTTP NotFound error
 */
function notFound(req, res, next) {
  next(new NotFound());
}

module.exports = notFound;
