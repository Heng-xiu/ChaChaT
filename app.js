var express = require('express');
var app = express();
var port = 3000;
var path = require('path');

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html'); // find index.html in views folder
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.route('/').get(function( req, res, next){
	res.render('index', {});
});

app.listen(port, function() {
	console.log('ChaChaT is working on Port 3000');
})
