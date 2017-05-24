require('../models/userModel');
require('../local');
const User = require('mongoose').model('User');
const passport = require('passport');


module.exports = (app) =>{

	app.get('/signup',(req,res) => {
		res.render('signup');
	});

	app.post('/signup',(req,res) => {
		let user = new User(req.body);
		user.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log(user);
			}
		});
	});

	app.get('/login',(req,res) => {
		res.render('login');
	});

	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/',
	                                   failureRedirect: '/login',
	                                   failureFlash: true })
	);

}