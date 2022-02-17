socket.emit('get_rooms_list', 'rooms')

socket.on('post_rooms_list', data =>{
	console.log(data)
})