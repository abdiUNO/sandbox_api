var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// create a schema
var userSchema = new Schema({
  email: String,
  username:String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

// we need to create a model
var User = mongoose.model('userSchema', userSchema);

// make this available to our users in our Node applications
module.exports = User;