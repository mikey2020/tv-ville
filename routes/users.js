require('../models/userModel');
require('../local');
const User = require('mongoose').model('User');
const passport = require('passport');

const getErrorMessage = function(err) {  
  let message = '';
  if (err.code) {    
    switch (err.code) {      
      case 11000:      
      case 11001:        
      message = 'Username already exists';        
      break;      
      default:       
      message = 'Something went wrong';    
    }  
  } 
  else {    
    for (var errName in err.errors) {      
      if (err.errors[errName].message) 
        message = err.errors[errName]. message;    
    }  
  }
  return message; 
};


module.exports = (app) =>{

	app.get('/signup',(req,res) => {
		res.render('signup');
	});

	app.post('/signup',(req,res) => {
		let user = new User(req.body);
		user.save(function(err){
			if(err){
	            const message = getErrorMessage(err);
				console.log(err);
				req.flash('error',message);
				res.redirect('/signup');
			}
			else{
				const prompt = "Please log in here";
				console.log(user);
				req.flash('info',prompt);
				res.redirect('/login');
			}
		});

		
	});

	app.get('/login',(req,res) => {
		if(!req.user){
			res.render('login',{
				messages: req.flash('error') || req.flash('info')
			});
		}
		else{
			res.redirect('/');
		}
		
	});

	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/',
	                                   failureRedirect: '/login',
	                                   failureFlash: true })
	);

}