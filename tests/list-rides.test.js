'use strict';

const request = require('supertest');
const { expect } = require('chai');
const db = require('../src/db');
const app = require('../src/app')();
const buildSchemas = require('../src/schemas');
const seed = require('../src/seed');
const clearTable = require('./clear-table');

describe('GET /rides', () => {
  before(async () => {
    await buildSchemas(db);
  });

  after(async () => {
    await clearTable(db);
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