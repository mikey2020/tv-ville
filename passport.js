require('./models/userModel');
const passport = require('passport');
const mongoose = require('mongoose');


module.exports = function(){

	let User = mongoose.model('User');

	passport.serializeUser(function(user,done){
		done(null,user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id, function(err, user) {
    		done(err, user);
  		});
	});

	require('./local.js');
};