module.exports = function(io, rooms) {
	var chatrooms = io.of('/roomlist').on('connection', function(socket) {
		console.log('[socket.js]connection establish on server !');
	});
};
