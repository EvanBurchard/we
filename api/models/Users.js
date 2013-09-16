/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
  attributes: {
    // Or for more flexibility:
    // phoneNumber: {
    //    type: 'STRING',
    //    defaultsTo: '555-555-5555'
    // }

    username: {
        type: 'STRING'
    },

    email: {
      type: 'email', // Email type will get validated by the ORM
      required: true
    },

    password: {
        type: 'STRING'
    },

    name: {
        type: 'STRING'
    },

    birthDate: 'DATE',

    // Override toJSON instance method
    // to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};
