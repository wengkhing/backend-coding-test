'use strict';

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const postRide = require('./handlers/post-ride');
const listRides = require('./handlers/list-rides');
const getRidesById = require('./handlers/get-rides-by-id');

module.exports = () => {
  app.get('/health', (req, res) => res.send('Healthy'));
  app.post('/rides', jsonParser, postRide);
  app.get('/rides', listRides);
  app.get('/rides/:id', getRidesById);

  return app;
};
