/**
 * Files
 *
 * @module      :: Model
 * @description :: Files model
 *
 */

module.exports = {

  attributes: {

    name: {
        type: 'STRING'
    },

    size: {
      type: 'integer'
    },

    url: {
        type: 'url'
    },

    active: 'boolean'


  }
};
