/**
 * Pupil.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var shortid = require('shortid');
module.exports = {

  attributes: {
      shortid: { type: 'String', required: true},
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
      },
      points: {
        type: 'Integer',
        required: true,
        defaultsTo: 0
      },
      character: {
        type: 'String',
      },
      state: {
        model: 'State'
      },

      completedWelcome: {
        type: 'Boolean',
        defaultsTo: false
      }

  },
  make: function (inputs, cb) {
    // Create a pupil
    if(inputs.name.indexOf(" ")==-1) {
      username = inputs.name;
    } else {
      username = inputs.name.substr(0,inputs.name.indexOf(" "));
      if(username=="") {
        username = "banana";
      }
    }

    username = username.toLowerCase();

    var passcode = Math.floor(1000 + Math.random() * 9000);
    var params ={
      name: inputs.name,
			username:username,
      shortid: shortid.generate(),
			dob: inputs.address,
			school: inputs.school,
      passcode: passcode,
      character:'',
      points:25
    };
    sails.log(params);
    Pupil.create(params).exec(cb);


  },
  edit: function(pupilid,inputs,cb) {
    if(inputs.name.indexOf(" ")==-1) {
      username = inputs.name;
    } else {
      username = inputs.name.substr(0,inputs.name.indexOf(" "));
      if(username=="") {
        username = "banana";
      }
    }
    username = username.toLowerCase();
    var passcode = Math.floor(1000 + Math.random() * 9000);
    Pupil.update({id:pupilid},
      {
        name: inputs.name,
			username:username,
			dob: inputs.address,
			school: inputs.school,
			passcode: passcode,
    }).exec(cb);
  },
  regenerate: function(pupilid,inputs,cb) {
    var passcode = Math.floor(1000 + Math.random() * 9000);
    Pupil.update({id:pupilid},
      {
			passcode: passcode
    }).exec(cb);
  },
  finishWelcome: function(pupilid,cb) {

    Pupil.update({id:pupilid},
      {
			completedWelcome: true
    }).exec(cb);
  },
  attemptLogin: function (inputs, cb) {
    // Create a user
    Pupil.findOne({
      username: inputs.username,
      // TODO: But encrypt the password first
      passcode: inputs.passcode
    })
    .exec(cb);
  }
};
