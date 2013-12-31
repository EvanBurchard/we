/**
 * Model tests
 */

var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var sinon   = require('sinon');

function UserStub () {
    return {
      username: 'GNU/Linux',
      name: "linux",
      email: "linux@albertosouza.net",
      password: "321"
    };
}

describe('UsersModel', function(done) {

  describe('Create', function(done) {

    it("Should be able to create a user", function(done) {
      Users.create(UserStub(), function(err, user) {
        if(err) console.log(err);
        assert.notEqual(user, undefined);
        done();
      });
    });

    it("Should return error on create user with already registered email", function(done) {
      var newUser = UserStub();
      Users.create(newUser, function(err, user) {
        err.should.not.be.empty;
        err.should.equal(
          'Uniqueness check failed on attribute: email with value: ' + newUser.email
        );
        assert.equal(user, undefined);
        done();
      });
    });
  });
});
