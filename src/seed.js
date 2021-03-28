'use strict';

const rides = [
    [12.111, 34.111, 56.111, 78.111, 'Adam Grant', 'Bill Gates', 'Mazda CX-5'],
    [12.222, 34.222, 56.222, 78.222, 'Larry Page', 'Melinda Gates', 'Yamaha Lagenda'],
    [12.333, 34.333, 56.333, 78.333, 'Sunder Pichai', 'Andrew Garfield', 'Toyota Vios'],
    [12.444, 34.444, 56.444, 78.444, 'Bruce Willy', 'Robert Downey Jr.', 'Honda Civic'],
    [12.555, 34.555, 56.555, 78.555, 'Chris Pratt', 'Mark Zuckerberg', 'Proton X-50'],
    [12.666, 34.666, 56.666, 78.666, 'Tony Stark', 'Pepper Potts', 'Perodua Ativa']
];

module.exports = (db) => {
    const createRideTableSchema = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';

    rides.forEach((ride) => {
        db.run(createRideTableSchema, ride);
    });

    return db;
};
