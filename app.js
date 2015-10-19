var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var cookieParser = require('cookie-parser');
var config = require('./config/config.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose').connect(config.dbURL);
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html'); // find index.html in views folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
	secret:'catscanfly',
	resave: true,
	saveUninitialized: true,
}));


// session
var env = process.env.NODE_ENV || 'development';
if(env === 'development'){
	// development specific settings
	app.use(session({
		secret: config.sessionSecret,
		resave: true,
		saveUninitialized: true,
	}));
} else {
	// production specific settings
	app.use(session({
		secret: config.sessionSecret,
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({
			// url: config.dbURL,
			mongooseConnection:mongoose.connections[0],
			stringify: true,
		}),
	}));
}
// passport init
app.use(passport.initialize());
// passport session
app.use(passport.session());
// passport
require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);
// Route
require('./routes/route.js')(express, app, passport);

app.listen(port, function() {
	console.log('ChaChaT is working on Port ' + port);
	console.log('Mode: ' + env);
});
