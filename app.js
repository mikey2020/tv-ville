const express = require('express');
const cookieParser  = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const app = express();



app.locals.title = "Tv Ville"

app.use(express.static('./public'));

app.set('views', './views');  
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true

}));


require('./routes/index.js')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app ;