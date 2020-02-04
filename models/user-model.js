const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: val => {
        const { error } = Joi.string()
          .uri()
          .validate(val);
        return !error;
      },
      message: 'Invalid url'
    }
  }
});
