/**
 * Play.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var shortid = require('shortid');
module.exports = {

  attributes: {
    pupil: {
        model: 'Pupil'
    },
    game: {
        model: 'Game'
    },
    session_id: {
      type:'string'
    },
    clicks: {
      type:'Text'
    },
    points: {
      type:'integer',
      required: true,
    },
    responses: {
      collection: 'Response',
      via:'play'
    }
  },

  new: function (inputs, cb) {
    // Create a user

    Play.create({
      pupil: inputs.pupil,
      game: inputs.game,
      shortid:shortid.generate(),
      points: inputs.points,
      clicks: inputs.clicks
    })
    .exec(cb);
  }


};
