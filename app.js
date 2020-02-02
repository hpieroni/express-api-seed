const express = require('express');
const config = require('./config');
const { authentication, errorHandler } = require('./middlewares');

const createApp = ({ port, token }) => {
  return express()
    .set('port', port)
    .use(authentication(token))
    .get('/', (req, res) => res.json({ message: 'server is up and running!' }))
    .use(errorHandler);
};

module.exports = {
  createApp,
  app: createApp(config)
};
