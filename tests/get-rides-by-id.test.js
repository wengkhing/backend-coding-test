'use strict';

const request = require('supertest');
const {expect} = require('chai');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
const seed = require('../src/seed');
const clearTable = require('./clear-table');

describe('GET /rides/:id', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    afterEach(async () => {
        await clearTable(db);
    });

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
            db.serialize(async () => {
                await seed(db);
            });
        });

        it('should return success', (done) => {
            request(app)
                .get('/rides/3')
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
                        rideID: 3,
                        riderName: 'Sunder Pichai',
                        startLat: 12.333,
                        startLong: 34.333
                    });
                })
                .end(done);
        });
    });
});