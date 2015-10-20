module.exports = function(io, rooms) {
	var chatrooms = io.of('/roomlist').on('connection', function(socket) {
		console.log('[socket.js]connection establish on server !');

		socket.on('newroom', function(data){
			console.log('data:' + data);
			rooms.push(data);
			socket.broadcast.emit('roomupdate', JSON.stringify(rooms));
			socket.emit('roomupdate', JSON.stringify(rooms));
		});
	});
};
