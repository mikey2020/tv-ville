require('dotenv').config();

const app = require('./app');


let port = process.env.PORT  ;


const server = app.listen(port,() => {
	console.log("Server listening at port " + port);
});