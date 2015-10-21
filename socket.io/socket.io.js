module.exports = function(io, rooms) {
	var chatrooms = io.of('/roomlist').on('connection', function(socket) {
		console.log('[socket.js]connection establish on server !');
		// importmant
		socket.emit('roomupdate', JSON.stringify(rooms));
		// 監聽是否有房間更新
		socket.on('newroom', function(data){
			rooms.push(data);
			socket.broadcast.emit('roomupdate', JSON.stringify(rooms));
			socket.emit('roomupdate', JSON.stringify(rooms));
		});
	});

	var messages = io.of('/messages').on('connection', function(socket) {
		console.log('[socket.js/m]messages !');
		socket.on('joinroom', function(data){
			socket.userName = data.userName;
			socket.userPic = data.userPic;
			socket.join(data.roomNum);
		});

		socket.on('newMessage', function(data){
			socket.broadcast.to(data.room_number).emit('messagefeed', JSON.stringify(data));
		});
	});
};
