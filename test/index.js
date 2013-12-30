
var Sails = require('sails');
var fs = require("fs");


/**
 * Before ALL the test bootstrap the server
 */
before(function(done) {

  this.timeout(5000);

  // TODO: Create the database
  // Database.createDatabase.....
  var config = gettestConfig();

  Sails.lift( config, function(err, sails) {
    done();
  });

});

require("fs").readdirSync( __dirname + "/controllers").forEach(function(file) {
  require("./controllers/" + file);
});

require("fs").readdirSync(__dirname + "/models").forEach(function(file) {
  require("./models/" + file);
});

/**
 * After ALL the tests, lower sails
 */
after(function(done) {
  // TODO: Clean up db
  // Database.clean...
  sails.lower(done);

});
