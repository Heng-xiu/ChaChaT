module.exports = function(passport, FacebookStrategy, config, mongoose){
	var chatUser = new mongoose.Schema({
		profileID: String,
		fullname: String,
		profilePic: String,
	});
	var userModel = mongoose.model('chatUser', chatUser);
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.use(new FacebookStrategy({
		clientID: config.fb.appID,
		clientSecret: config.fb.appSecret,
		callbackURL: config.fb.callbackURL,
		profileFields: ['id', 'displayName', 'photos'],
	}, function(accessToken, refreshToken, profile, don) {
		// check use is already in our mongodb
		// if not, create one and return profile
		// if exist, simply return the profile
		userModel.findOne({'profileID': profile.id}, function(err, result){
			if(result){
				done(null, result);
			} else {
				//create new user in out mongodb
				var newChatUser = new userModel({
					profileID: profile.id,
					fullname: profile.displayName,
					profilePic: profile.photos[0].value || '',
				});
				newChatUser.save(function(err) {
					done(null, newChatUser);
				});
			}

		});
	}));
};
