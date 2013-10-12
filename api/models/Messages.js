/**
 * Messages
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
    fromId: {
      type: 'string',
      required: true
    },
    toId: {
      type: 'array',
      required: true,
    },
    message: 'string'
  }

};
