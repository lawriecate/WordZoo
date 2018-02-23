/**
 * Word.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    word: {
      type: 'string',
      required: true,
      unique: true
    },
    num_vowels: {
      type: 'integer',
      required: true
    },
    num_syllables: {
      type: 'integer',
      required: true
    }
  }
};
