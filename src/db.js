const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.query = function (sql, params) {
  const dbInstance = this;

  return new Promise(function (resolve, reject) {
    dbInstance.all(sql, params, function (error, rows) {
      if (error) {
        reject(error);
      } else {
        resolve({ rows, statement: this });
      }
    });
  });
};

db.execute = function (sql, params) {
  const dbInstance = this;

  return new Promise(function (resolve, reject) {
    dbInstance.run(sql, params, function (error, rows) {
      if (error) {
        reject(error);
      } else {
        resolve({ rows, statement: this });
      }
    });
  });
};

module.exports = db;