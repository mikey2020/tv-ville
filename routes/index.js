
module.exports = (app) => {

	app.get('/',(req,res) => {
		if(req.user){
			if(req.session.log){
				console.log(req.session.log);
			}
			
			req.session.log = new Date();
			
			res.render('index',{
				name: req.user.username,
				log: req.session.log
			});


		}

		else{
			res.redirect('/login');
		}
		
	});

};

