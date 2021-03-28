'use strict';

const request = require('supertest');
const { expect } = require('chai');

const db = require('../src/db');

const app = require('../src/app')();
const buildSchemas = require('../src/schemas');
const seed = require('../src/seed');
const clearTable = require('./clear-table');

const validRideInput = {
  driver_name: 'James Clear',
  driver_vehicle: 'Yamaha Lagenda',
  end_lat: 51.1234,
  end_long: 51.543453,
  rider_name: 'Warren Buffett',
  start_lat: 80.9894,
  start_long: 49.34343
};

describe('API tests', () => {
  before(async () => {
    await buildSchemas(db);
  });

  describe('GET /health', () => {
    it('should return healthy', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/u)
        .expect(200, 'Healthy', done);
    });
  });

  describe('GET /rides/:id', () => {
    describe('when ride does not exist', () => {
      it('should return error', (done) => {
        request(app)
          .get('/rides/123')
          .expect('Content-Type', /json/u)
          .expect(404, {
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides'
          }, done);
      });
    });
    
    describe('when ride exist', () => {
      before(() => {
        db.serialize(() => {
          seed(db);
        });
      });

      after(async () => {
        await clearTable(db);
      });
    
      it('should return success', (done) => {
        request(app)
          .get('/rides/2')
          .expect('Content-Type', /json/u)
          .expect(200)
          .expect((res) => {
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('created');
            expect(res.body[0]).to.include({
              driverName: 'Andrew Garfield',
              driverVehicle: 'Toyota Vios',
              endLat: 56.333,
              endLong: 78.333,
              rideID: 2,
              riderName: 'Sunder Pichai',
              startLat: 12.333,
              startLong: 34.333
            });
          })
          .end(done);
      });
    });
  });

  describe('GET /rides', () => {
    describe('when database is empty', () => {
      it('should return error', (done) => {
        request(app)
          .get('/rides')
          .expect('Content-Type', /json/u)
          .expect(404, {
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides'
          }, done);
      });
    });
    
    describe('when database is not empty', () => {
      describe('and no query specified', () => {
        before(() => {
          db.serialize(() => {
            seed(db);
          });
        });
  
        after(async () => {
          await clearTable(db);
        });
  
        it('by default, should return first 10 items', (done) => {
          request(app)
            .get('/rides')
            .expect('Content-Type', /json/u)
            .expect(200)
            .expect((res) => {
              expect(res.body.length).to.equal(10);
              expect(res.body[0]).to.include({ rideID: 1 });
              expect(res.body[res.body.length - 1]).to.include({ rideID: 10 });
            })
            .end(done);
        });
      });

      describe('query specified, lastKey is 5 and limit is 3', () => {
        before(() => {
          db.serialize(() => {
            seed(db);
          });
        });
  
        after(async () => {
          await clearTable(db);
        });
  
        it('should return 3 records starting from 6', (done) => {
          request(app)
            .get('/rides')
            .query({ lastKey: 5, limit: 3 })
            .expect('Content-Type', /json/u)
            .expect(200)
            .expect((res) => {
              expect(res.body.length).to.equal(3);
              expect(res.body[0]).to.include({ rideID: 6 });
              expect(res.body[res.body.length - 1]).to.include({ rideID: 8 });
            })
            .end(done);
        });
      });

      describe('query specified, lastKey is 12 and limit is 7', () => {
        before(() => {
          db.serialize(() => {
            seed(db);
          });
        });
  
        after(async () => {
          await clearTable(db);
        });
  
        it('should return 7 records starting from 13', (done) => {
          request(app)
            .get('/rides')
            .query({ lastKey: 12, limit: 7 })
            .expect('Content-Type', /json/u)
            .expect(200)
            .expect((res) => {
              expect(res.body.length).to.equal(7);
              expect(res.body[0]).to.include({ rideID: 13 });
              expect(res.body[res.body.length - 1]).to.include({ rideID: 19 });
            })
            .end(done);
        });
      });
      
    });
  });

  describe('POST /rides', () => {
    describe('when start_lat more than 90 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            start_lat: 99
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when start_lat less than -90 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            start_lat: -99
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when start_long more than 180 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            start_long: 189
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when start_long less than -180 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            start_long: -189
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when end_lat more than 90 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            end_lat: 99
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when end_lat less than -90 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            end_lat: -99
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when end_long more than 180 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            end_long: 189
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('when end_long less than -180 degree', () => {
      it('should return validation error', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput,
            end_long: -189
          })
          .expect('Content-Type', /json/u)
          .expect(400, {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          }, done);
      });
    });
    
    describe('Rider name validation', () => {
      describe('when is null', () => {
        it('should return validation error', (done) => {
          request(app)
            .post('/rides')
            .send({
              ...validRideInput,
              rider_name: null
            })
            .expect('Content-Type', /json/u)
            .expect(400, {
              error_code: 'VALIDATION_ERROR',
              message: 'Rider name must be a non empty string'
            }, done);
        });
      });
    
      describe('when is an empty string', () => {
        it('should return validation error', (done) => {
          request(app)
            .post('/rides')
            .send({
              ...validRideInput,
              rider_name: ''
            })
            .expect('Content-Type', /json/u)
            .expect(400, {
              error_code: 'VALIDATION_ERROR',
              message: 'Rider name must be a non empty string'
            }, done);
        });
      });
    });
    
    describe('Driver name validation', () => {
      describe('when is null', () => {
        it('should return validation error', (done) => {
          request(app)
            .post('/rides')
            .send({
              ...validRideInput,
              driver_name: null
            })
            .expect('Content-Type', /json/u)
            .expect(400, {
              error_code: 'VALIDATION_ERROR',
              message: 'Driver name must be a non empty string'
            }, done);
        });
      });
    
      describe('when is an empty string', () => {
        it('should return validation error', (done) => {
          request(app)
            .post('/rides')
            .send({
              ...validRideInput,
              driver_name: ''
            })
            .expect('Content-Type', /json/u)
            .expect(400, {
              error_code: 'VALIDATION_ERROR',
              message: 'Driver name must be a non empty string'
            }, done);
        });
      });
    });
    
    describe('Driver vehicle validation', () => {
      describe('when is null', () => {
        it('should return validation error', (done) => {
          request(app)
            .post('/rides')
            .send({
              ...validRideInput,
              driver_vehicle: null
            })
            .expect('Content-Type', /json/u)
            .expect(400, {
              error_code: 'VALIDATION_ERROR',
              message: 'Driver vehicle must be a non empty string'
            }, done);
        });
      });
    
      describe('when is an empty string', () => {
        it('should return validation error', (done) => {
          request(app)
            .post('/rides')
            .send({
              ...validRideInput,
              driver_vehicle: ''
            })
            .expect('Content-Type', /json/u)
            .expect(400, {
              error_code: 'VALIDATION_ERROR',
              message: 'Driver vehicle must be a non empty string'
            }, done);
        });
      });
    });
    
    describe('when provide valid ride details', () => {
      it('should return success', (done) => {
        request(app)
          .post('/rides')
          .send({
            ...validRideInput
          })
          .expect('Content-Type', /json/u)
          .expect(200)
          .expect((res) => {
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('created');
            expect(res.body[0]).to.include({
              driverName: 'James Clear',
              driverVehicle: 'Yamaha Lagenda',
              endLat: 51.1234,
              endLong: 51.543453,
              rideID: 1,
              riderName: 'Warren Buffett',
              startLat: 80.9894,
              startLong: 49.34343
            });
          })
          .end(done);
      });
    });
  });
});