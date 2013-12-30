/**
 * Script how runs before all tests 
 * Use it to preload some dependences for tests
 */

require('should');

// TODO move this database config to sails config/local.js
global.gettestConfig= function(done) {

  // TODO: Create the database
  // Database.createDatabase.....

  return {

    log: {
      level: 'error'
    },

    adapters: {
      'default': 'memory',

      memory: {
        module: 'sails-memory'
      }
    },
    port: 1330
  };

};

global.getApp = function(cb){

};
