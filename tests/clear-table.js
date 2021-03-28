'use strict';

module.exports = (db) => {
    const clearTable = 'DELETE FROM Rides';
    const resetSequence = 'UPDATE sqlite_sequence SET seq = 0 WHERE name="Rides"';

    db.run(clearTable);
    db.run(resetSequence);

    return db;
};