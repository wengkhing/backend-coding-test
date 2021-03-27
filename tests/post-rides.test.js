'use strict';

const request = require('supertest');
const {expect} = require('chai');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

const validRideInput = {
    driver_name: 'James Clear',
    driver_vehicle: 'Yamaha Lagenda',
    end_lat: 51.1234,
    end_long: 51.543453,
    rider_name: 'Warren Buffett',
    start_lat: 80.9894,
    start_long: 49.34343
};

describe('POST /rides', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

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