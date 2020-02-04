const router = require('express').Router();
const Joi = require('@hapi/joi');
const userController = require('../controllers/user-controller');
const requestValidator = require('../middlewares/request-validator');

const body = Joi.object({
  name: Joi.string().required(),
  avatar: Joi.string()
    .uri()
    .required()
});

router.post('/', requestValidator({ body }), userController.create);

module.exports = router;
