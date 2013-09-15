/**
 * Bootstrap
 */

var Sails = require('sails');
var assert = require('assert');
    //Utils = require('./utils'),
    //Database = require('./database'),
    //localConf = require('../../config/local');
var request = require('supertest');

/**
 * Before ALL the test bootstrap the server
 */

var app;

before(function(done) {


  this.timeout(5000);

  // TODO: Create the database
  // Database.createDatabase.....

  Sails.lift({

    log: {
      level: 'error'
    },

    adapters: {
      mongo: {
        module: 'sails-mongo',
        host: 'localhost',
        database: 'test_database',
        user: '',
        pass: ''
      }
    }

  }, function(err, sails) {
    app = sails;
    done(err, sails);
  });

});


describe('Basic', function(done) {
  it("should cause error", function(done) {
    assert.equal(1, 2, "error");
    done();
  });
});

describe('User', function(done) {
  it("should be able to create", function(done) {
    User.create({name: "hee", email: "a@b.c"}, function(err, user) {
      assert.notEqual(user, undefined);
      done();
    });
  });
});

describe('Routes', function(done) {
  it('GET / should return 200', function (done) {
    request(app.express.app).get('/').expect(200, done);
  });
});

/**
 * After ALL the tests, lower sails
 */

after(function(done) {

  // TODO: Clean up db
  // Database.clean...

  app.lower(done);

});