'use strict';

const rides = [
  [12.111, 34.111, 56.111, 78.111, 'Adam Grant', 'Bill Gates', 'Mazda CX-5'],
  [12.333, 34.333, 56.333, 78.333, 'Sunder Pichai', 'Andrew Garfield', 'Toyota Vios']
];

module.exports = (db, done) => {
  const createRideTableSchema = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.run(createRideTableSchema, rides[0], () => {
    db.run(createRideTableSchema, rides[1], () => {
      done();
    });
  });

  return db;
};
