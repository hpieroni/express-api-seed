const router = require('express').Router();
const Joi = require('@hapi/joi');
const asyncHandler = require('express-async-handler');
const objectId = require('../utils/joi-objectId');
const requestValidator = require('../middlewares/request-validator');
const { create } = require('../controllers/article-controller');

const body = Joi.object({
  userId: objectId.required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

router.post('/', requestValidator({ body }), asyncHandler(create));

module.exports = router;
