'use strict';

const request = require('supertest');
const app = require('../src/app')();

describe('GET /health', () => {
  describe('when calling the endpoint', () => {
    it('should return healthy', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/u)
        .expect(200, 'Healthy', done);
    });
  });
});