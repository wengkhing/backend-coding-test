'use strict';

const rides = [
  [12.111, 34.111, 56.111, 78.111, 'Adam Grant', 'Bill Gates', 'Mazda CX-5'],
  [12.333, 34.333, 56.333, 78.333, 'Sunder Pichai', 'Andrew Garfield', 'Toyota Vios'],
  [12.222, 34.222, 56.222, 78.222, 'Aemiliana Shuhrat', 'Wasyl Romeo', 'Yamaha Lagenda'],
  [12.333, 34.333, 56.333, 78.333, 'Fathimath Wayna', 'Githa Sandip', 'Perodua Ativa'],
  [12.555, 34.555, 56.555, 78.555, 'Kadmos Flavienne', 'Dragoslav Jaxon', 'Proton X-50'],
  [12.333, 34.333, 56.333, 78.333, 'Vasudha Catellus', 'Jofre Spartacus', 'Perodua Ativa'],
  [12.666, 34.666, 56.666, 78.666, 'Krasimira Carmelo', 'Katelin Oili', 'Mazda CX-5'],
  [12.333, 34.333, 56.333, 78.333, 'Luken Anselmo', 'Leopoldo Ashish', 'Perodua Ativa'],
  [12.777, 34.777, 56.777, 78.777, 'Eartha Remigiusz', 'Jeroboam Iddo', 'Perodua Ativa'],
  [12.333, 34.333, 56.333, 78.333, 'Sanjeet Evgeni', 'Eireen Kuzey', 'Yamaha Lagenda'],
  [12.888, 34.888, 56.888, 78.888, 'Wynne Varinius', 'Jordanes Trefor', 'Mazda CX-5'],
  [12.333, 34.333, 56.333, 78.333, 'Marcelina Dileep', 'Avtandil Brina', 'Perodua Ativa'],
  [12.999, 34.999, 56.999, 78.999, 'Roydon Gaspare', 'Sinikka Kasih', 'Perodua Ativa'],
  [12.333, 34.333, 56.333, 78.333, 'Ella Atanasija', 'Briseida Kristupas', 'Yamaha Lagenda'],
  [12.111, 34.111, 56.111, 78.111, 'Cleto Cristina', 'Bojana Siana', 'Mazda CX-5'],
  [12.333, 34.333, 56.333, 78.333, 'Labhrás Valentín', 'Dorit Seva', 'Perodua Ativa'],
  [12.111, 34.111, 56.111, 78.111, 'Vladimir Consuela', 'Serafim Emlyn', 'Perodua Ativa'],
  [12.333, 34.333, 56.333, 78.333, 'Bente Erasmo', 'Kjerstin Divna', 'Toyota Vios'],
  [12.111, 34.111, 56.111, 78.111, 'Yoshirou Leni', 'Hilal Blaženka', 'Perodua Ativa'],
  [12.333, 34.333, 56.333, 78.333, 'Jone Turnus', 'Porunn Felinus', 'Yamaha Lagenda']
];

module.exports = (db) => {
  const createRideTableSchema = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';

  rides.forEach(async (ride) => {
    await db.execute(createRideTableSchema, ride);
  });
};
