'use strict';

const port = 8010;

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

const appConfig = require('./src/app');

db.serialize(() => {
  buildSchemas(db);

  const app = appConfig(db);
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`App started and listening on port ${port}`));
});