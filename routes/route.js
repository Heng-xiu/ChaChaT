module.exports = function(express, app){
	var router = express.Router();

	router.get('/', function( req, res, next){
		res.render('index', {});
	});

	router.get('/chatrooms', function(req, res, next) {
		res.render('chatrooms', {});
	});

	// session
	router.get('/setcolor', function(req, res, next){
		req.session.favColor = "RED";
		res.send('Setting favourite color !');
	});

	router.get('/getcolor', function(req, res, next) {
		res.send('Favorite color: '
		+ (req.session.favColor === undefined ? "Not found" : req.session.favColor));
	});

	app.use('/', router);
};