'use strict';

module.exports = async (db) => {
  const clearTable = 'DELETE FROM Rides';
  const resetSequence = 'UPDATE sqlite_sequence SET seq = 0 WHERE name="Rides"';

  await db.execute(clearTable);
  await db.execute(resetSequence);

  return db;
};
