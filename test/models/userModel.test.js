/**
 * Model tests
 */

var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var sinon   = require('sinon');

function UserStub () {
    return {
      username: 'albertosouza',
      name: "Alberto",
      email: "contato@albertosouza.net",
      password: "123"
    };
}

describe('Users', function(done) {

  describe('Model', function(done) {
    describe('Create', function(done) {

      it("Should be able to create a user", function(done) {
        Users.create(UserStub(), function(err, user) {
          if(err) console.log(err);
          assert.notEqual(user, undefined);
          done();
        });
      });

      it("Should return error on create user with already registered email", function(done) {
        Users.create(UserStub(), function(err, user) {
          err.should.not.be.empty;
          assert.equal(user, undefined);
          done();
        });
      });
    });
  }); // end database
});
