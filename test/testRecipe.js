const supertest = require('supertest');
const should = require('should'); // eslint-disable-line
const User = require('../app/models/user');
const server = supertest.agent("http://localhost:8080");

describe('RecipeApp Unit Test', function() {
//Add a user
it('should add a user', function(done) {
// post to /register
server
.post('/register')
.send({username: 'Test', password: '123'})
.expect(200)
.end(function(err, res) {
  res.status.should.equal(200);
  done();
});
});

it('should add a recipe', function(done){
  server
  .post('/login')
  .send({username: 'Test', password: '123'})
  .expect(302) //being redirected after login
  .end(function(err, res){
    server
    .post('/recipes')
    .send({name: 'Pancakes', img: 'https://www.pic.com', ingredients: 'Ingredients', instructions: 'Mix'})
    .expect(302) //being redirected after post
    .end(function(err, res){
      res.status.should.equal(302);
      done();
    });
  });
});

it('should redirect if trying to add recipe and not logged in', function(done){
    server
    .post('/recipes')
    .send({name: 'Pancakes', img: 'https://www.pic.com', ingredients: 'Ingredients', instructions: 'Mix'})
    .expect(302)
    .end(function(err, res){
      res.status.should.equal(302);
      done();
    });
});

it('should return error after add', function(done){
  server
  .post('/login')
  .send({username: 'Test', password: '123'})
  .end(function(err, res){
    server
    .post('/recipes')
    .send({name: 'Pancakes@', img: 'https://www.pic.com', ingredients: 'Ingredients', instructions: 'Mix'})
    .expect(500)
    .end(function(err, res){
      res.status.should.equal(500);
      done();
    });
  });
});

it('should return recipes page', function(done) {
  // calling home page api
  server
  .get('/')
  .expect('Content-type', /html/)
  .expect(200) 
  .end(function(err, res) {
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
  });
});
});
