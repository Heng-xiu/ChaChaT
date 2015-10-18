var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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

var env = process.env.NODE_ENV || 'development';
if(env === 'development'){
	// development specific settings
} else {
	// production specific settings
}
// Route
require('./routes/route.js')(express, app);

app.listen(port, function() {
	console.log('ChaChaT is working on Port ' + port);
	console.log('Mode: ' + env);
});
