socket.emit('get', 'rooms')

socket.on('post_rooms_list', data =>{
	console.log(data)
})