const express = require('express');
const { authentication, errorHandler, notFound } = require('./middlewares');
const routes = require('./routes');

const greeting = (req, res) => res.json({ message: 'server is up and running!' });

module.exports = ({ port, token, database }) => {
  return express()
    .set('port', port)
    .set('db', database)
    .use(express.json())
    .use(authentication(token))
    .get('/', greeting)
    .use('/v1', routes)
    .use(notFound)
    .use(errorHandler);
};
