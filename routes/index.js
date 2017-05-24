const baseUrl = "http://api.tvmaze.com";
const request = require('request');
module.exports = (app) => {

	app.get('/',(req,res) => {
		if(req.user){
			if(req.session.log){
				console.log(req.session.log);
			}
			
			req.session.log = new Date();

			res.render('index',{
				username: req.user.username,
				log: req.session.log,
				data: ""
			});
		}

		else{
			res.redirect('/login');
		}
		
	});

	app.post('/',(req,res) => {
		console.log(req.body.query);

		request(baseUrl + "/search/shows?q=" + req.body.query,function(err,resp,body){
		    if(err){
		      console.log("There was problem during connection");
		    }
		    console.log("running");
		    let data = JSON.parse(resp.body);
		 	//var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
		 	console.log(data);
		    res.render('index',{
		    	username: req.user.username,
				log: req.session.log,
				data: data
			});
 
		});

		//console.log(data);
		
		
	});


};

//baseUrl + "/search/shows?q=" + req.body.query

