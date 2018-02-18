/**
 * WordResponse.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    play: {
        model: 'Play'
    },
    pupil: {
        model: 'Pupil'
    },
    word: {
      model: 'Word'
    },
    correct: {
      type: 'boolean'
    },
    timeToResponse: {
      type: 'integer'
    }

  },


};