/**
 * Bootstrap
 * Logged of user and public access tests
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var sinon   = require('sinon');

var localConf = require('../../config/local');

function UserStub () {
    return {
      username: 'albertosouza',
      name: "Alberto",
      email: "contato@albertosouza.net",
      password: "123"
    };
}

/**
 * Before ALL the test bootstrap the server
 */

describe('UsersController', function(done) {

  // JSON REQUESTS //
  describe('JSON Requests', function(done) {

    it('GET /users should return 200 and users array', function (done) {
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

    it('POST /users should return 200 and new user object', function (done) {
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

  }); // end requests

});
