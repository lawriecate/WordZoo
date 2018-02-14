/**
 * Game.js
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
    source: {
      type: 'string',
      required: true
    },
    live: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    slug: {
      type: 'string',
      required: true
    }
  },
  make: function (inputs, cb) {
    // Create a school
    Game.create({
      name: inputs.name,
      source:inputs.source,
      live: inputs.live,
      slug: inputs.slug
    }).exec(cb);

  },

};
