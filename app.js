var express = require('express');
var app = express();
var port = 3000;

// Route
app.route('/').get(function( req, res, next){
	res.send('<h1>Hello world</h1>');
});


app.listen(port, function() {
	console.log('ChaChaT is working on Port 3000');
})
