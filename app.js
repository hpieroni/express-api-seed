const express = require('express');
const { authentication, errorHandler, notFound } = require('./middlewares');

module.exports = ({ port, token }) => {
  return express()
    .set('port', port)
    .use(authentication(token))
    .get('/', (req, res) => res.json({ message: 'server is up and running!' }))
    .use(notFound)
    .use(errorHandler);
};
