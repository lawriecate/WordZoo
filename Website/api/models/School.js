/**
 * School.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var crypto = require('crypto');
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
      type: 'text',
      required: false
    },
    postcode: {
      type: 'string',
      required: false
    },
    country: {
      type: 'string',
      required: false,
      defaultsTo: 'UK'
    },
    signupcode: {
      type:'string'
    },
    classes: {
      collection: 'Class',
      via: 'school'
    },
    teachers: {
      collection: 'User',
      via: 'teaches_at',
      dominant:true
    },
    pupils: {
      collection: 'Pupil',
      via: 'school'
    }
  },

  make: function (inputs, cb) {
    // Create a school
    School.create({
      name: inputs.name,
			phone:inputs.phone,
			address: inputs.address,
			postcode: inputs.postcode,
			country: inputs.country,
    }).exec(cb);

  },

  regenerateCode: function(school,cb) {
    newToken =  crypto.randomBytes(20).toString('hex');
    School.update({id:school},{signupcode:newToken}).exec(cb);
  },


};
