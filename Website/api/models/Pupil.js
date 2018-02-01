/**
 * Pupil.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      name : { type: 'String', required: true },
      username: { type: 'String', required: true },
      dob: { type: 'Date'},
      in_class: {
        collection: 'Class',
        via: 'pupils'
      },
      school: {
        model: 'School'
      },
      passcode: {
        type: 'String',
        required: true
      }

  },
  make: function (inputs, cb) {
    // Create a pupil
    var name = inputs.name;
    var first_name = name.substr(0,name.indexOf(" ")).toLowerCase();
    var passcode = Math.floor(1000 + Math.random() * 9000);
    Pupil.create({
      name: inputs.name,
			username:first_name,
			dob: inputs.address,
			school: inputs.school,
			passcode: passcode,
    }).exec(cb);

  },
  update: function(pupilid,inputs,cb) {
    var name = inputs.name;
    var first_name = name.substr(0,name.indexOf(" ")).toLowerCase();
    var passcode = Math.floor(1000 + Math.random() * 9000);
    Pupil.update({id:pupilid},
      {
        name: inputs.name,
			username:first_name,
			dob: inputs.address,
			school: inputs.school,
			passcode: passcode,
    }).exec(cb);
  }
};
