'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('GET /health', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('when calling the endpoint', () => {
        it('should return healthy', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/u)
                .expect(200, 'Healthy', done);
        });
    });
});