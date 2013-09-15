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
        type: 'STRING'
    },

    password: {
        type: 'STRING'
    },

    name: {
        type: 'STRING'
    }
  }
};
