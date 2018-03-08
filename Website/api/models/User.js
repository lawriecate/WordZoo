/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
    teaches_at: {
      collection: 'School',
      via: 'teachers'
    }
  },


  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    

    // Create a user
    if(!inputs.is_admin) {
      inputs.is_admin=false;
    }
    //if(inputs.email == 'admin@email.com') {is_admin = true;}

    bcrypt.hash( inputs.password, 5, function( err, bcryptedPassword) {
      User.create({
        name: inputs.name,
        email: inputs.email,
        // TODO: But encrypt the password first
        password:bcryptedPassword,
        admin: inputs.is_admin,
        matchingPasswords:inputs.password==inputs.confirmPassword,
      })
      .exec(cb);
    });



  },

  changePassword: function(user,newPassword, cb) {

    bcrypt.hash( newPassword, 5, function( err, bcryptedPassword) {
      User.update({id:user.id},{password:bcryptedPassword})
      .exec(cb);
    });
  },




  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {

    User.findOne({
      email: inputs.email,

    })
    .populate('teaches_at')
    .exec(function(err,user) {
      if(err) { cb(err,null); }
      if(!user) {cb(err,null);}
      bcrypt.compare(inputs.password, user.password, function(err, doesMatch){
      //  sails.log(doesMatch)
      //  sails.log(inputs.password + " vs " + user.password)
        if (doesMatch){
          cb(false,user);
        }else{
           cb(err,null);
        }
       });
    });





  },

  beforeCreate: function (values, next) {
  
    if(!values.matchingPasswords) {
      
      return next({
        err : ["Passwords do not match"]
      });
    }
    return next();
  }
};
