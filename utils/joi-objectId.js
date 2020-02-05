const Joi = require('@hapi/joi');
const { Types } = require('mongoose');

module.exports = Joi.custom(value => {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error();
  }
  return value;
}).message('must be an ObjectId');
