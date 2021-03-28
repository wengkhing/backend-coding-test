'use strict';

const port = 8010;

const db = require('./src/db');

const buildSchemas = require('./src/schemas');

const seed = require('./src/seed');

const appConfig = require('./src/app');

const logger = require('./src/logger.js');

db.serialize(async () => {
  await buildSchemas(db);
  seed(db, () => {
    const app = appConfig(db);
    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
  });
});