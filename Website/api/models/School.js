/**
 * School.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'string',
      required: false
    },
    address: {
      type: 'string',
      required: false
    },
    postcode: {
      type: 'string',
      required: false
    },
    created: {
      type: 'datetime',
      required: true
    },
    classes: {
      collection: 'Class',
      via: 'school'
    }
  },

};
