
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
    }
  }

}