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
			updateUserList(data.roomNum, true);
		});

		socket.on('newMessage', function(data){
			socket.broadcast.to(data.room_number).emit('messagefeed', JSON.stringify(data));
		});

		function updateUserList(roomNum, updateAll) {
			// BUG 目前socket.io 沒法抓該room的client
			var roomsocketId = io.nsps['/messages'].adapter.rooms[roomNum];
			roomsocketId = Object.keys(roomsocketId)[0];
			var getUsers = io.nsps['/messages'].connected[roomsocketId];
			var userList = [];
			// for(var i in getUsers){
			// 	userList.push({
			// 		// user: getUsers[i].userName,
			// 		// userPic: getUsers[i].userPic,
			// 	});
			// }
			userList.push({
				user: getUsers.userName,
				userPic: getUsers.userPic,
			});
			socket.emit('updateUsersList', JSON.stringify(userList)).to(roomNum);

			if(updateAll){
				socket.broadcast.to(roomNum).emit('updateUsersList', JSON.stringify(userList));
			}
		}

		socket.on('updateList', function(data){
			updateUserList(data.room);
		});
	});
};
