const createError = require('http-errors');
const Joi = require('@hapi/joi');
const set = require('lodash.set');

/**
 * Formats Joi error into a key value fashion
 *
 * @param {Object} error Joi error object
 * @example
 * // returns { body: { name: 'is required' } }
 * formatError({ details: [{ path: ['body', 'name'], message: 'is required'}] });
 *
 * @returns { Object } a key value object with error messages
 */
const formatError = ({ details }) =>
  details.reduce((errorObj, { path, message }) => set(errorObj, path, message), {});

/**
 * @param {Object} schema optional Joi schemas for params, query and body
 * @returns {Function} request validator middleware
 */
const requestValidator = ({ params = Joi.any(), query = Joi.any(), body = Joi.any() }) =>
  /**
   * Request validator middleware
   * Validates req params, query or body given its expected schemas
   *
   * @param {Object} req Express req object
   * @param {Object} res Express res object
   * @param {Function} next next function
   *
   * @throws { HttpError } 400 HTTP BadRequest error
   */
  (req, res, next) => {
    const reqSchema = Joi.object({ params, query, body }).unknown(true);
    const { error } = reqSchema.validate(req, { abortEarly: false, errors: { label: false } });

    if (error) {
      throw createError(400, 'Invalid request', { detail: formatError(error) });
    }

    next();
  };

module.exports = requestValidator;
