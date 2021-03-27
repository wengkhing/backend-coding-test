'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/u)
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return health', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/u)
                .expect(400, {
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                }, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return health', (done) => {
            request(app)
                .get('/rides/123')
                .expect('Content-Type', /json/u)
                .expect(400, {
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                }, done);
        });
    });
});