'use strict';

module.exports = async (db) => {
  const clearTable = 'DELETE FROM Rides';
  const resetSequence = 'UPDATE sqlite_sequence SET seq = 0 WHERE name="Rides"';

  await db.asyncRun(clearTable);
  await db.asyncRun(resetSequence);

  return db;
};
