
module.exports = (app) => {

	app.get('/',(req,res) => {
		if(req.session.log){
			console.log(req.session.log);
		}
		req.session.log = new Date();
		res.render('index');
	});

};

