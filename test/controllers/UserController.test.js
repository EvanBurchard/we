
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var sinon   = require('sinon');
var uuid = require('node-uuid');

function UserStub () {
    return {
      username: uuid.v1(),
      name: "Alberto",
      email: uuid.v1() + "@albertosouza.net",
      password: uuid.v1()
    };
}

describe('UsersController', function() {

  afterEach(function(done){
    // remove all users after each test block
    Users.destroy(function (err) {
      if(err) return done(err);
      done();
    } );
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {

      it('/users should return 200 and users array', function (done) {
        request(sails.express.app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          assert.equal(err, null);
          // TODO implement response data check
          //res.body.users.should.be.an.instanceOf(Array);
          done();
        });
      });

      it('/users should return 200 and one user', function (done) {

        Users.create(UserStub(), function(err, newUser) {
          if(err) return done(err);

          request(sails.express.app)
          .get('/users/' + newUser.id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);

            should.not.exist(err);
            res.body.email.should.equal(newUser.email);
            res.body.id.should.equal(newUser.id);

            done();
          });

        });

      });      

      it('/users/current should return 200 and logged in user object');


      it('/users/logout should logout a user, return 200 and redirect to index');

    });
    describe('POST', function() {

      it('/users should return 200 and new user object', function (done) {
        var user = UserStub();
        var jsonResponse;

        user.confirmPassword = user.password;

        request(sails.express.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          
          if(err) console.log(err);
          assert.equal(err, null);
          jsonResponse = JSON.parse(res.text);
          res.statusCode.should.equal(200);
          done();
        });
      });
      it('/users/login should login a user with new password, return 200 and logged in user object',function (done) {
        var user  = UserStub();
        var authParams = {
          email: user.email,
          password: user.password
        };

        Users.create(user, function(err, newUser) {
          if(err) return done(err);

          request(sails.express.app)
          .post('/users/login')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( authParams )
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {       
            if(err) return done(err);
            // TODO add suport for server messages
            // 
            res.body.email.should.equal(user.email);
            res.body.should.be.instanceof(Object);

            done();
          });

        });

      });

      it('/users/login shold return 404 with wrong password, return 404',function (done) {
        var user  = UserStub();
        var authParams = {
          email: user.email,
          password: 'aRealyWrongPassword'
        };
        // create user to test
        Users.create(user, function(err, newUser) {
          if(err) return done(err);

          request(sails.express.app)
          .post('/users/login')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( authParams )
          .expect('Content-Type', /json/)
          .expect(404)
          .end(function (err, res) {         
            if(err) return done(err);
            // TODO add suport for server messages
            should.not.exist(res.body.email);
            console.log(res.body);
            done();
          });

        });

      });

      it('/users/logout should logout a user and return 200');

    });
    describe('PUT', function() {
     it('/users/:id should return 200 and updated user object');

    });
    describe('DELETE', function() {
      it('/users/:id should return 200 ');

    });
  }); // end requests

});
