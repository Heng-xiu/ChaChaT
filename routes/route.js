module.exports = function(express, app, passport){
	var router = express.Router();

	router.get('/', function( req, res, next){
		res.render('index', {});
	});
	// 檢查是否登入
	function securePages(req, res, next){
		if(req.isAuthenticated()){
			next();
		} else {
			res.redirect('/');
		}
	}
	// facebook
	router.get('/auth/facebook', passport.authenticate('facebook'));
	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/chatrooms',
		failureRedirect: '/',
	}));

	router.get('/chatrooms', securePages, function(req, res, next) {
		res.render('chatrooms', {user: req.user});
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

	router.get('/logout', function(req, res, next){
		req.logout();
		res.redirect('/');
	});

	app.use('/', router);
};
