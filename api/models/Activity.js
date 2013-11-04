/**
 * Activity
 *
 * @module      :: Model
 * @description :: Activity model
 *
 */

module.exports = {

  attributes: {

    active:{
      type: 'boolean',
      defaultsTo: true
    },

    text: {
      type: 'url'
    },

    creator_id: {
      type: 'string'
    },

    sharedWith: {
      type: 'array'
    }
  }

};
