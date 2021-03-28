'use strict';

const request = require('supertest');
const {expect} = require('chai');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
const seed = require('../src/seed');
const clearTable = require('./clear-table');

describe('GET /rides', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);
            clearTable(db);

            done();
        });
    });

    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    after(() => {
        clearTable(db);
    });

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
        before((done) => {
            db.serialize(() => {
                seed(db);
                done();
            });
        });

        it('should return success', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/u)
                .expect(200)
                .expect((res) => {
                    expect(res.body.length).to.equal(6);
                })
                .end(done);
        });
    });
});