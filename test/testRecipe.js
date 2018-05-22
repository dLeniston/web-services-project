import supertest from 'supertest';
import {app} from './app.js';
import should from 'should'; // eslint-disable-line

// UNIT test begin
describe('Recipe API Unit Text', function() {
this.timeout(120000); 
it('should return collection of JSON documents', function(done) {
  supertest(app)
  .get('/contacts')
  .expect('Content-type', /json/)
  .expect(200)
  .end(function(err, res) {
      res.status.should.equal(200);
      done();
  });
});
});